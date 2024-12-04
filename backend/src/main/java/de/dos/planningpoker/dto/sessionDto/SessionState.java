package de.dos.planningpoker.dto.sessionDto;

import de.dos.planningpoker.model.websocket.PlanningPokerSession;
import de.dos.planningpoker.model.websocket.Story;
import de.dos.planningpoker.model.websocket.User;
import de.dos.planningpoker.model.websocket.Vote;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class SessionState {
    private String sessionId;
    private String scrumMasterId;
    private List<User> participants;

    // User Stories
    private List<Story> userStories;
    private String currentUserStoryId;

    private LocalDateTime roundStart;
    private List<Vote> sessionVotes;
    private boolean votesRevealed;
    
    public SessionState(PlanningPokerSession session) {
        this.sessionId = session.getId();

        this.scrumMasterId = session.getScrumMasterId();
        this.participants = new ArrayList<>(session.getUsers().values());

        this.userStories = session.getUserStories().values().stream().toList();
        this.currentUserStoryId = session.getCurrentUserStoryId();

        this.roundStart = session.getRoundStart();
        this.sessionVotes = session.getSessionVotes();
        this.votesRevealed = session.getRevealStatus();

    }

    public SessionState() {
        this.sessionId = null;
        this.scrumMasterId = null;
        this.participants = new ArrayList<>();

        this.userStories = new ArrayList<>();
        this.currentUserStoryId = null;

        this.roundStart = null;
        this.sessionVotes = null;
        this.votesRevealed = false;
    }
}
