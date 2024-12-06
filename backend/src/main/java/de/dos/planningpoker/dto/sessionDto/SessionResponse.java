package de.dos.planningpoker.dto.sessionDto;

import de.dos.planningpoker.model.websocket.Story;
import de.dos.planningpoker.model.websocket.User;
import de.dos.planningpoker.model.websocket.Vote;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SessionResponse {
    private String sessionId;
    private String scrumMasterId;
    private String memberId;
    private List<User> participants;
    private List<Story> userStories;
    private String currentUserStoryId;
    private List<Vote> sessionVotes;
    private boolean voteRevealed;
}
