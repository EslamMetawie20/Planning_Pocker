package de.dos.planningpoker.controller;

import de.dos.planningpoker.dto.*;
import de.dos.planningpoker.enumeration.NotificationType;
import de.dos.planningpoker.enumeration.Role;
import de.dos.planningpoker.model.entity.Session;
import de.dos.planningpoker.model.websocket.PlanningPokerSession;
import de.dos.planningpoker.model.websocket.User;
import de.dos.planningpoker.repository.SessionRepository;
import de.dos.planningpoker.repository.UserStoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Controller
@RequiredArgsConstructor
public class PlanningPokerController {
    private final SessionRepository sessionRepository;
    private final UserStoryRepository userStoryRepository;
    private final SimpMessagingTemplate messagingTemplate;

    // Store multiple sessions by sessionId
    private final Map<String, PlanningPokerSession> sessions = new ConcurrentHashMap<>();


    @MessageMapping("/poker/session/ids/get")
    public void getSessionIds() {
        sendSessionIds();
    }

    @MessageMapping("/poker/create")
    @SendTo("/topic/session/created")
    public SessionResponse createSession(CreateSessionRequest createSessionRequest) {
        // Generate session ID
        String sessionCode = UUID.randomUUID().toString().substring(0, 8);

        // Create Scrum Master
        User scrumMaster = new User(
                UUID.randomUUID().toString(),
                createSessionRequest.getUserName(),
                Role.SCRUM_MASTER,
                sessionCode
        );
        // Create session entity
        Session sessionEntity = new Session();
        sessionEntity.setSessionCode(sessionCode);
        sessionEntity.setActive(true);
         sessionRepository.save(sessionEntity);  // Speichern in DB

        // Create new session
        PlanningPokerSession session = new PlanningPokerSession(sessionCode);
        session.addUser(scrumMaster);

        // Add session to the map
        sessions.put(sessionCode, session);
        sendSessionIds();

        // Return session details
        return SessionResponse.builder()
                .sessionId(sessionCode)
                .participants(new ArrayList<>(session.getUsers().values()))
                .memberId(scrumMaster.getId())
                .scrumMasterId(scrumMaster.getId())
                .scrumMasterName(scrumMaster.getName())
                .joinUrl("/join/" + sessionCode)
                .build();
    }

    @MessageMapping("/poker/join")
    @SendTo("/topic/session/joined")
    public SessionResponse join(JoinRequest joinRequest) {
        PlanningPokerSession session = sessions.get(joinRequest.getSessionId());
        if (session == null) {
            sendErrorToUser(joinRequest.getUserName(), "Session not found");
            return null;
        }
        if (!session.isActive()) {
            sendErrorToUser(joinRequest.getUserName(), "Session is no longer active");
            return null;
        }

        // Create new User
        User user = new User(
                UUID.randomUUID().toString(),
                joinRequest.getUserName(),
                Role.TEAM_MEMBER,
                session.getId()
        );

        // Add user to session
        session.addUser(user);

        // Notify participants about the new member
        ParticipantNotification notification = new ParticipantNotification(user.getName(), NotificationType.JOIN);
        notifyParticipants(session.getId(), notification);

        // Send session state to all users
        sendSessionState(session.getId());
        // Return session details
        return SessionResponse.builder()
                .sessionId(session.getId())
                .memberId(user.getId())
                .build();
    }

    @MessageMapping("/poker/reconnect")
    @SendTo("/topic/session/reconnected")
    public SessionResponse reconnect(ReconnectRequest request) {
        PlanningPokerSession session = sessions.get(request.getSessionId());
        if (session == null || !session.isActive()) {
            return null;
        }
        User user = session.getUsers().get(request.getUserId());
        if (user == null) {
            return null;
        }

        sendSessionState(session.getId());
        return SessionResponse.builder()
                .sessionId(session.getId())
                .participants(new ArrayList<>(session.getUsers().values()))
                .build();
    }

    @MessageMapping("/poker/leave")
    public void leave(LeaveRequest request) {
        PlanningPokerSession session = sessions.get(request.getSessionId());
        if (session == null || !session.isActive()) {
            return;
        }
        User user = session.getUsers().get(request.getUserId());
        if (user == null) {
            return;
        }
        session.removeUser(user.getId());

        // Notify participants about the user leaving
        ParticipantNotification notification = new ParticipantNotification(user.getName(), NotificationType.LEAVE);
        notifyParticipants(session.getId(), notification);

        // Send session state to all users
        sendSessionState(session.getId());
    }

    @MessageMapping("/poker/close")
    public void closeSession(CloseSessionRequest request) {
        PlanningPokerSession session = sessions.get(request.getSessionId());
        if (session == null || !session.isActive()) {
            return;
        }
        // If user is not Scrum Master, they can't close the session
        if (!session.getScrumMasterId().equals(request.getUserId())) {
            sendErrorToUser(request.getUserId(), "Only Scrum Master can close the session");
            return;
        }

        // if (!session.getUsers().isEmpty()) {
        //     sendErrorToUser(request.getUserId(), "Some team members are still in the session");
        //     return;
        // }

        session.setActive(false);
        sessions.remove(request.getSessionId()); // Remove the session from the map
        sendSessionState(request.getSessionId());
    }

    private void notifyParticipants(String sessionId, ParticipantNotification notification) {
        messagingTemplate.convertAndSend("/topic/session/" + sessionId + "/participants", notification);
    }

    private void sendErrorToUser(String userId, String message) {
        messagingTemplate.convertAndSendToUser(userId, "queue/errors", new ErrorResponse(message));
    }

    private void sendSessionState(String sessionId) {
        PlanningPokerSession session = sessions.get(sessionId);
        if (session == null) {
            SessionState sessionState = new SessionState();
            messagingTemplate.convertAndSend("/topic/session/" + sessionId + "/state", sessionState);
            return;
        }
        SessionState sessionState = new SessionState(session);
        messagingTemplate.convertAndSend("/topic/session/" + sessionId + "/state", sessionState);
    }

    private void sendSessionIds() {
        // Collect all active session IDs
        List<String> activeSessionIds = sessions.entrySet().stream()
                .filter(entry -> entry.getValue().isActive()) // Only active sessions
                .map(Map.Entry::getKey) // Get session IDs
                .toList(); // Convert to a List
        
        messagingTemplate.convertAndSend("/topic/session/ids", activeSessionIds);
    }
}
