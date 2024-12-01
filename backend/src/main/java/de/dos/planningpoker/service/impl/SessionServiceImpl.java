package de.dos.planningpoker.service.impl;

import de.dos.planningpoker.dto.CreateSessionRequest;
import de.dos.planningpoker.dto.JoinRequest;
import de.dos.planningpoker.dto.SessionResponse;
import de.dos.planningpoker.enumeration.Role;
import de.dos.planningpoker.model.entity.Session;
import de.dos.planningpoker.model.entity.UserStory;
import de.dos.planningpoker.model.websocket.PlanningPokerSession;
import de.dos.planningpoker.model.websocket.User;
import de.dos.planningpoker.repository.SessionRepository;
import de.dos.planningpoker.service.SessionService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@Service
@Transactional
public class SessionServiceImpl {
    private final SessionRepository sessionRepository;
    private final Map<String, PlanningPokerSession> activeSessions = new ConcurrentHashMap<>();
    private final SimpMessageSendingOperations messagingTemplate;  // Neu hinzugefügt



    public SessionResponse createSession(CreateSessionRequest request) {

        try {
            // Log incoming request
            System.out.println("Creating session with request: " + request);

            // 1. Create database entities
            Session sessionEntity = new Session();
            String sessionCode = UUID.randomUUID().toString().substring(0, 8);
            sessionEntity.setSessionCode(sessionCode);
            sessionEntity.setActive(true);

            // Initialize userStories collection if null
            if (sessionEntity.getUserStories() == null) {
                sessionEntity.setUserStories(new ArrayList<>());
            }

            // Create initial user story only if title is provided
            if (request.getInitialStoryTitle() != null && !request.getInitialStoryTitle().trim().isEmpty()) {
                UserStory storyEntity = new UserStory();
                storyEntity.setTitle(request.getInitialStoryTitle());
                storyEntity.setDescription(request.getInitialStoryDescription());

                // Set bidirectional relationship
                storyEntity.setSession(sessionEntity);
                sessionEntity.getUserStories().add(storyEntity);

                System.out.println("Created UserStory with title: " + storyEntity.getTitle());
            }

            // Save to database and flush
            sessionEntity = sessionRepository.saveAndFlush(sessionEntity);

            // Verify save operation



            // 2. Create WebSocket session
            User scrumMaster = new User(
                    UUID.randomUUID().toString(),
                    request.getUserName(),
                    Role.SCRUM_MASTER,
                    sessionCode
            );

            PlanningPokerSession wsSession = new PlanningPokerSession(sessionCode);
            wsSession.addUser(scrumMaster);
            wsSession.setDatabaseId(sessionEntity.getId());
            activeSessions.put(sessionCode, wsSession);

            // 3. Return response
            return SessionResponse.builder()
                    .sessionId(sessionCode)
                    .participants(new ArrayList<>(wsSession.getUsers().values()))
                    .memberId(scrumMaster.getId())
                    .scrumMasterId(scrumMaster.getId())
                    .scrumMasterName(scrumMaster.getName())
                    .joinUrl("/join/" + sessionCode)
                    .build();

        } catch (Exception e) {
            System.err.println("Error creating session: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to create session", e);
        }
    }



    public SessionResponse joinSession(JoinRequest request) {
        try {
            // 1. Validiere und hole Session
            PlanningPokerSession wsSession = activeSessions.get(request.getSessionId());
            if (wsSession == null) {
                throw new IllegalArgumentException("Session not found: " + request.getSessionId());
            }

            // 2. Erstelle neuen User
            User newUser = new User(
                    UUID.randomUUID().toString(),
                    request.getUserName(),
                    Role.TEAM_MEMBER,
                    request.getSessionId()
            );


            // 3. Füge User zur Session hinzu
            wsSession.addUser(newUser);

            // 4. Erstelle Response mit ALLEN Teilnehmern
            List<User> allParticipants = new ArrayList<>(wsSession.getUsers().values());

            // 5. Sende Teilnehmer-Update an alle
            sendParticipantsUpdate(request.getSessionId(), allParticipants);

            return SessionResponse.builder()
                    .sessionId(wsSession.getId())
                    .participants(allParticipants)  // Wichtig: Alle Teilnehmer zurückgeben
                    .memberId(newUser.getId())
                    .scrumMasterId(wsSession.getScrumMasterId())
                    .build();

        } catch (Exception e) {
            System.err.println("Error in joinSession: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to join session", e);
        }
    }

    private void sendParticipantsUpdate(String sessionId, List<User> participants) {
        String destination = String.format("/topic/session/%s/participants", sessionId);
        System.out.println("Sending to destination: " + destination);
        System.out.println("Participants to send: " + participants.stream()
                .map(u -> "Name:" + u.getName() + ", Role:" + u.getRole())
                .collect(Collectors.joining(", ")));
        messagingTemplate.convertAndSend(destination, participants);
    }

    public List<String> getActiveSessionIds() {
        try {
            List<Session> activeSessions = sessionRepository.findByActiveTrue();
            System.out.println("Total sessions in DB: " + sessionRepository.count());
            System.out.println("Active sessions found: " + activeSessions.size());
            System.out.println("Active sessions details: " +
                    activeSessions.stream()
                            .map(s -> "ID:" + s.getId() + " Code:" + s.getSessionCode())
                            .collect(Collectors.joining(", ")));

            return activeSessions.stream()
                    .map(Session::getSessionCode)
                    .collect(Collectors.toList());
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    private void sendJoinNotification(String sessionId, User user) {
        // Diese Methode muss noch implementiert werden
        // Sie sollte die Benachrichtigung an alle Session-Teilnehmer senden
        System.out.println("Should send join notification for user: " + user.getName());
    }

    public Session getSessionByCode(String sessionCode) {
        return sessionRepository.findBySessionCode(sessionCode)
                .orElseThrow(() -> new IllegalArgumentException("Session not found"));
    }

    public PlanningPokerSession getActiveSession(String sessionCode) {
        return activeSessions.get(sessionCode);
    }
}
