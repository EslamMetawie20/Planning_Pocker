package de.dos.planningpoker.model.websocket;



import de.dos.planningpoker.enumeration.Role;
import de.dos.planningpoker.model.entity.UserStory;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.ArrayList;
import java.util.List;
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

    // Neue Felder für User Stories
    private List<UserStory> userStories = new ArrayList<>();
    private UserStory currentUserStory;

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

    // Neue Methoden für User Story Management
    public void setCurrentUserStory(UserStory userStory) {
        // Prüfen ob die User Story in der Liste existiert
        if (!userStories.contains(userStory)) {
            userStories.add(userStory);
        }
        this.currentUserStory = userStory;
    }

    public void addUserStory(UserStory userStory) {
        if (!userStories.contains(userStory)) {
            userStories.add(userStory);
        }
    }

    public void removeUserStory(UserStory userStory) {
        userStories.remove(userStory);
        if (currentUserStory != null && currentUserStory.equals(userStory)) {
            currentUserStory = null;
        }
    }

    public UserStory getCurrentUserStory() {
        return currentUserStory;
    }

    public List<UserStory> getUserStories() {
        return new ArrayList<>(userStories); // Rückgabe einer Kopie für Thread-Sicherheit
    }
}
