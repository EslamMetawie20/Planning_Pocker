package de.dos.planningpoker.controller;

import de.dos.planningpoker.dto.*;
import de.dos.planningpoker.enumeration.NotificationType;
import de.dos.planningpoker.enumeration.Role;
import de.dos.planningpoker.dto.ErrorResponse;
import de.dos.planningpoker.model.PlanningPokerSession;
import de.dos.planningpoker.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.UUID;

@Controller
@RequiredArgsConstructor
public class PlanningPokerController {
    private final SimpMessagingTemplate messagingTemplate;
    private PlanningPokerSession session;

    @MessageMapping("/poker/create")
    @SendTo("/topic/session/created")
    public SessionResponse createSession(CreateSessionRequest createSessionRequest){
        // generate sessionID
        String sessionId = UUID.randomUUID().toString().substring(0, 8);
        // create scrum master
        User scrumMaster = new User(
                UUID.randomUUID().toString(),
                createSessionRequest.getUserName(),
                Role.SCRUM_MASTER,
                sessionId
        );

        // create new session
        session = new PlanningPokerSession(sessionId);
        session.addUser(scrumMaster);

        //return session details
        return SessionResponse.builder()
                .sessionId(sessionId)
                .scrumMasterName(scrumMaster.getName())
                .joinUrl("/join/" + sessionId)
                .build();
    }
    @MessageMapping("/poker/join")
    public void join(JoinRequest joinRequest){
        if(session == null){
            sendErrorToUser(joinRequest.getUserName(), "Session not found");
            return;
        }
        if(!session.isActive()){
            sendErrorToUser(joinRequest.getUserName(), "Session is no longer active");
            return;
        }

        // create new User
        User user = new User(
                UUID.randomUUID().toString(),
                joinRequest.getUserName(),
                Role.TEAM_MEMBER,
                session.getId()
        );
        // add user to session
        session.addUser(user);

        ParticipantNotification notification = new ParticipantNotification(user.getName(), NotificationType.JOIN);
        // notify all participants about the new member
        notifyParticipants(notification);

        // send session state to all users
        sendSessionState();
    }
    @MessageMapping("/poker/leave")
    public void leave(LeaveRequest request){
        if(session == null || !session.isActive()){
            return;
        }
        User user = session.getUsers().get(request.getUserId());
        if(user == null){
            return;
        }
        session.removeUser(user.getId());

        ParticipantNotification notification = new ParticipantNotification(user.getName(), NotificationType.LEAVE);
        notifyParticipants(notification);

        // send session state to all users
        sendSessionState();
    }
    @MessageMapping("/poker/close")
    public void closeSession(CloseSessionRequest request){
        if(session == null){
            return;
        }
        if(!session.isActive()){
            return;
        }
        // if user is not scrum master, then can't close session
        if(!session.getScrumMasterId().equals(request.getUserId())){
            sendErrorToUser(request.getUserId(), "Only Scrum Master can close");
            return;
        }
        if(!session.getUsers().isEmpty()){
            sendErrorToUser(request.getUserId(), "Some team members are not left");
        }
        session.setActive(false);
    }

    private void notifyParticipants(ParticipantNotification notification) {
        messagingTemplate.convertAndSend("/topic/session/" + session.getId() + "/participants", notification);
    }

    // send error message to specific user
    private void sendErrorToUser(String userId, String message) {
        messagingTemplate.convertAndSendToUser(userId,"queue/errors", new ErrorResponse(message));
    }
    // send updated sessionState to user
    private void sendSessionState() {
        // create session state for specific user
        SessionState sessionState = new SessionState(session);
        // send state to specific user
        messagingTemplate.convertAndSend("/topic/session/state", sessionState);
    }

}
