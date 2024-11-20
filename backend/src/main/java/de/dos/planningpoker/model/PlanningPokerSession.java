package de.dos.planningpoker.model;

import de.dos.planningpoker.enumeration.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
@Data
@RequiredArgsConstructor
public class PlanningPokerSession {
    private String id;
    private String scrumMasterId;
    // Using ConcurrentHashMap for thread-safe operations
    private Map<String, User> users = new ConcurrentHashMap<>();
    private boolean active;

    public PlanningPokerSession(String id) {
        this.id = id;
        this.active = true;
    }

    // add a user to the session
    public void addUser(User user) {
        // if user is Scrum Master, verify no existing Scrum Master
        if(user.getRole() == Role.SCRUM_MASTER){
            if(scrumMasterId != null && !user.getId().equals(scrumMasterId)){
                throw new IllegalStateException("Session already has a Scrum Master");
            }
            this.scrumMasterId = user.getId();
        }
        users.put(user.getId(), user);
    }

    public void removeUser(String id) {
        users.remove(id);
    }
}
