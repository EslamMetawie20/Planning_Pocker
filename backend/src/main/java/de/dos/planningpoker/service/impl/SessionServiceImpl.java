package de.dos.planningpoker.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import de.dos.planningpoker.dto.sessionDto.CreateSessionRequest;
import de.dos.planningpoker.dto.sessionDto.JoinRequest;
import de.dos.planningpoker.dto.sessionDto.SessionResponse;
import de.dos.planningpoker.dto.storyDto.AddStoryRequest;
import de.dos.planningpoker.dto.storyDto.UpdateStoryRequest;
import de.dos.planningpoker.dto.storyDto.VoteStoryRequest;
import de.dos.planningpoker.enumeration.Role;
import de.dos.planningpoker.model.entity.Session;
import de.dos.planningpoker.model.websocket.PlanningPokerSession;
import de.dos.planningpoker.model.websocket.Story;
import de.dos.planningpoker.model.websocket.User;
import de.dos.planningpoker.model.websocket.Vote;
import de.dos.planningpoker.repository.SessionRepository;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
@Transactional
public class SessionServiceImpl {

    private final SessionRepository sessionRepository;
    private final Map<String, PlanningPokerSession> activeSessions = new ConcurrentHashMap<>();

    public SessionResponse createSession(CreateSessionRequest request) {
        try {
            // 1. Create database entities
            Session sessionEntity = new Session();
            String sessionCode = UUID.randomUUID().toString().substring(0, 8);
            sessionEntity.setSessionCode(sessionCode);
            sessionEntity.setActive(true);

            // Save to database and flush
            sessionEntity = sessionRepository.saveAndFlush(sessionEntity);

            // 2. Create WebSocket session
            User scrumMaster = new User(
                    UUID.randomUUID().toString(),
                    request.getUserName(),
                    Role.SCRUM_MASTER,
                    sessionCode);

            PlanningPokerSession wsSession = new PlanningPokerSession(sessionCode);

            // Create initial user story only if title is provided
            if (request.getInitialStoryTitle() != null && !request.getInitialStoryTitle().trim().isEmpty()) {
                String storyId = UUID.randomUUID().toString().substring(0, 8);
                Story story = new Story(storyId, request.getInitialStoryTitle(), request.getInitialStoryDescription(),
                        false);
                wsSession.putUserStory(story);
            }

            wsSession.addUser(scrumMaster);
            wsSession.setDatabaseId(sessionEntity.getId());
            activeSessions.put(sessionCode, wsSession);

            // 3. Return response
            return SessionResponse.builder()
                    .sessionId(sessionCode)
                    .memberId(scrumMaster.getId())
                    .scrumMasterId(scrumMaster.getId())
                    .participants(new ArrayList<>(wsSession.getUsers().values()))
                    .userStories(new ArrayList<>(wsSession.getUserStories().values()))
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
            PlanningPokerSession wsSession = getSessionByCode(request.getSessionCode());

            // 2. Erstelle neuen User
            User newUser = new User(
                    UUID.randomUUID().toString(),
                    request.getUserName(),
                    Role.TEAM_MEMBER,
                    request.getSessionCode());

            // 3. Füge User zur Session hinzu
            wsSession.addUser(newUser);

            return SessionResponse.builder()
                    .sessionId(wsSession.getId())
                    .memberId(newUser.getId())
                    .scrumMasterId(wsSession.getScrumMasterId())
                    .participants(new ArrayList<>(wsSession.getUsers().values()))
                    .userStories(new ArrayList<>(wsSession.getUserStories().values()))
                    .votes(wsSession.getSessionVotes())
                    .currentUserStoryId(wsSession.getCurrentUserStoryId())
                    .build();

        } catch (Exception e) {
            System.err.println("Error in joinSession: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to join session", e);
        }
    }

    public void removeSession(String sessionCode) {
        try {
            activeSessions.remove(sessionCode);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // ----------------------------------------------------------------------------------------------
    public List<String> getActiveSessionCodes() {
        try {

            return activeSessions.keySet().stream().toList();
        } catch (Exception e) {
            e.printStackTrace();
            return new ArrayList<>();
        }
    }

    public PlanningPokerSession getSessionByCode(String sessionCode) {
        PlanningPokerSession wsSession = activeSessions.get(sessionCode);
        if (wsSession == null) {
            throw new IllegalArgumentException("Session not found: " + sessionCode);
        }
        return wsSession;
    }

    public PlanningPokerSession getActiveSession(String sessionCode) {
        return activeSessions.get(sessionCode);
    }

    public SessionResponse getSessionState(String sessionCode) {
        PlanningPokerSession wsSession = getSessionByCode(sessionCode);

        return SessionResponse.builder()
                .sessionId(wsSession.getId())
                .scrumMasterId(wsSession.getScrumMasterId())
                .participants(new ArrayList<>(wsSession.getUsers().values()))
                .userStories(new ArrayList<>(wsSession.getUserStories().values()))
                .build();
    }

    // ----------------------------------------------------------------------------------------------
    public void addUserStory(String sessionCode, AddStoryRequest storyRequest) {
        PlanningPokerSession wsSession = getSessionByCode(sessionCode);

        String storyId = UUID.randomUUID().toString().substring(0, 8);
        Story story = new Story(storyId, storyRequest.getTitle(), storyRequest.getDescription(), false);
        wsSession.putUserStory(story);
    }

    public void updateUserStory(String sessionCode, UpdateStoryRequest storyRequest) {
        PlanningPokerSession wsSession = getSessionByCode(sessionCode);

        Story story = new Story(storyRequest.getUserStoryId(), storyRequest.getTitle(), storyRequest.getDescription(),
                false);
        wsSession.putUserStory(story);
    }

    public void removeUserStory(String sessionCode, String storyId) {
        PlanningPokerSession wsSession = getSessionByCode(sessionCode);
        wsSession.removeUserStory(storyId);
    }

    public void selectUserStory(String sessionCode, String storyId) {
        PlanningPokerSession wsSession = getSessionByCode(sessionCode);
        wsSession.setCurrentUserStory(storyId);
    }

    public void acceptUserStory(String sessionCode, String storyId) {
        PlanningPokerSession wsSession = getSessionByCode(sessionCode);
        wsSession.setCurrentUserStory(storyId);
    }

    public void voteUserStory(VoteStoryRequest request) {
        PlanningPokerSession wsSession = getSessionByCode(request.getSessionCode());

        Vote vote = new Vote(request.getSessionCode(), request.getUserId(), 0, LocalDateTime.now());
        wsSession.addVote(vote);
    }

    public void revealSessionVotes(String sessionCode) {
        PlanningPokerSession wsSession = getSessionByCode(sessionCode);
        wsSession.revealVotes();
    }

    public void resetSessionRound(String sessionCode) {
        PlanningPokerSession wsSession = getSessionByCode(sessionCode);
        wsSession.resetRound();
    }
}
