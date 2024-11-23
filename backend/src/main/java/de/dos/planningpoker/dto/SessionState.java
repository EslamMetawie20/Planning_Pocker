package de.dos.planningpoker.dto;

import de.dos.planningpoker.model.PlanningPokerSession;
import de.dos.planningpoker.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
public class SessionState {
    private String sessionId;
    private String scrumMaster;
    private List<User> participants;

    public SessionState(PlanningPokerSession session) {
        this.sessionId = session.getId();
        this.scrumMaster = session.getScrumMasterId();
        this.participants = new ArrayList<>(session.getUsers().values());
    }

    public SessionState() {
        this.sessionId = null;
        this.scrumMaster = null;
        this.participants = new ArrayList<>();
    }
}
