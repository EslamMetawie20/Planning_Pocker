package de.dos.planningpoker.controller;

import de.dos.planningpoker.dto.*;
import de.dos.planningpoker.enumeration.Role;
import de.dos.planningpoker.model.ErrorResponse;
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
    @MessageMapping("poker/create")
    @SendTo("/topic/session/created")
    public SessionResponse createSession(CreateSessionRequest request){
        // generate sessionID
        String sessionId = UUID.randomUUID().toString().substring(0, 8);

        User scrumMaster = new User(
                UUID.randomUUID().toString(),
                request.getUserName(),
                Role.SCRUM_MASTER
        );

        // create new session
        session = new PlanningPokerSession(sessionId, scrumMaster.getId());
        session.addUser(scrumMaster);

        //return session details
        return SessionResponse.builder()
                .sessionId(sessionId)
                .scrumMasterName(scrumMaster.getName())
                .joinUrl("/join" + sessionId)
                .build();
    }
    @MessageMapping("/poker/join")
    public void join(JoinRequest request){
        if(session == null){
            sendErrorToUser(request.getUserName(), "Session not found");
            return;
        }
        if(!session.isActive()){
            sendErrorToUser(request.getUserName(), "Session is no longer active");
            return;
        }

        // create new User
        User user = new User(
                UUID.randomUUID().toString(),
                request.getUserName(),
                Role.TEAM_MEMBER
        );
        // add user to session
        session.addUser(user);

        // notify all participants about the new member
        notifyParticipants();

        // send session state to new participant
        sendSessionState(user);
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

        notifyParticipants();
    }
    @MessageMapping("/poker/close")
    public void closeSession(CloseSessionRequest request){
        if(session == null){
            return;
        }
        if(!session.getScrumMasterId().equals(request.getUserId())){
            sendErrorToUser(session.getScrumMasterId(), "Only Scrum Master can close");
            return;
        }
        session.setActive(false);
    }

    private void notifyParticipants() {
        messagingTemplate.convertAndSend("/topic/session/" + session.getId() + "/participants", session.getUsers().values());
    }

    private void sendErrorToUser(String userName, String message) {
        messagingTemplate.convertAndSendToUser(userName,"queue/errors", new ErrorResponse(message));
    }

    private void sendSessionState(User user) {
        // create session state for specific user
        SessionState sessionState = new SessionState(session, user);
        // send state to specific user
        messagingTemplate.convertAndSendToUser(user.getId(), "/queue/session/state", sessionState);
    }

}
