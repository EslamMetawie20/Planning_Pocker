package de.dos.planningpoker.controller;

import de.dos.planningpoker.dto.*;
import de.dos.planningpoker.enumeration.NotificationType;
import de.dos.planningpoker.enumeration.Role;
import de.dos.planningpoker.model.entity.Session;
import de.dos.planningpoker.model.entity.UserStory;
import de.dos.planningpoker.model.websocket.PlanningPokerSession;
import de.dos.planningpoker.model.websocket.User;
import de.dos.planningpoker.repository.SessionRepository;
import de.dos.planningpoker.repository.UserStoryRepository;
import de.dos.planningpoker.service.impl.SessionServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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
    private final SessionServiceImpl sessionService;



    // Store multiple sessions by sessionId
    private final Map<String, PlanningPokerSession> sessions = new ConcurrentHashMap<>();




    @MessageMapping("/poker/create")
    @SendTo("/topic/session/created")
    public SessionResponse createSession(CreateSessionRequest createSessionRequest) {
        System.out.println("Received request: " + createSessionRequest); // LOG hinzugefügt
        SessionResponse response = sessionService.createSession(createSessionRequest);


        return response;
    }

    @MessageMapping("/poker/join")
    @SendTo("/topic/session/joined")
    public SessionResponse join(JoinRequest joinRequest) {
        System.out.println("Received join request for session: " + joinRequest.getSessionId() +
                " from user: " + joinRequest.getUserName());

        SessionResponse response = sessionService.joinSession(joinRequest);

        System.out.println("Join processed. Response contains " +
                response.getParticipants().size() + " participants");

        return response;
    }

    @MessageMapping("/poker/session/ids/get")
    @SendTo("/topic/session/ids")
    public List<String> getSessionIds() {
        try {
            System.out.println("BE: Received request for session IDs");
            List<String> activeIds = sessionService.getActiveSessionIds();
            System.out.println("BE: Found active sessions: " + activeIds);
            return activeIds;
        } catch (Exception e) {
            System.err.println("BE: Error getting session IDs: " + e.getMessage());
            e.printStackTrace();
            return new ArrayList<>();
        }
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


//    @MessageMapping("/poker/userstory/select")
//    public void selectUserStory(SelectUserStoryRequest request) {
//        // Session und User validieren
//        PlanningPokerSession session =sessions.get(request.getSessionId());
//        if (session == null || !session.isActive()) {
//            sendErrorToUser(request.getUserCode(), "Session nicht gefunden oder inaktiv");
//            return;
//        }
//
//        // Prüfen ob der User Scrum Master ist
//        User user = session.getUsers().get(request.getUserCode());
//        if (user == null || !user.getRole().equals(Role.SCRUM_MASTER)) {
//            sendErrorToUser(request.getUserCode(), "Nur der Scrum Master kann User Stories auswählen");
//            return;
//        }
//
//        try {
//            // User Story aus der Datenbank holen und als ausgewählt markieren
//            UserStory userStory = userStoryRepository.findByUserStoryCode(request.getUserStoryCode())
//                    .orElseThrow(() -> new RuntimeException("User Story nicht gefunden"));
//
//            // Aktuelle User Story in der Session setzen
//            session.setCurrentUserStory(userStory);
//
//            // Alle Session-Teilnehmer über die neue User Story informieren
//            UserStoryNotification notification = UserStoryNotification.builder()
//                    .userStoryCode(userStory.getUserStoryCode())
//                    .title(userStory.getTitle())
//                    .description(userStory.getDescription())
//                    .build();
//
//            // Benachrichtigung an alle Teilnehmer senden
//            messagingTemplate.convertAndSend(
//                    "/topic/session/" + session.getId() + "/userstory",
//                    notification
//            );
//
//            // Session-Status aktualisieren
//            sendSessionState(session.getId());
//
//        } catch (Exception e) {
//            sendErrorToUser(request.getUserStoryCode(), "Fehler beim Auswählen der User Story: " + e.getMessage());
//        }
//    }



}
