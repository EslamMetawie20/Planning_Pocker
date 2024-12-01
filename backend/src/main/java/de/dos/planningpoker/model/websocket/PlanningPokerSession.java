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
    private final String id;         // sessionCode
    private Long databaseId;         // neue Feld für DB-Referenz
    private String scrumMasterId;
    private String scrumMasterName;
    private Map<String, User> users = new ConcurrentHashMap<>();
    private boolean active = true;   // direkt initialisieren

    // UserStory Management
    private List<UserStory> userStories = new ArrayList<>();
    private UserStory currentUserStory;

    // Constructor können wir vereinfachen, da @RequiredArgsConstructor das handled
    // und active bereits initialisiert ist

    public void addUser(User user) {
        if (user.getRole() == Role.SCRUM_MASTER) {
            if (scrumMasterId != null && !user.getId().equals(scrumMasterId)) {
                throw new IllegalStateException("Session already has a Scrum Master");
            }
            this.scrumMasterId = user.getId();
        }
        users.put(user.getId(), user);
    }

    public void removeUser(String id) {
        if (id.equals(scrumMasterId)) {
            scrumMasterId = null;    // Scrum Master ID zurücksetzen wenn der Scrum Master geht
        }
        users.remove(id);
    }

    // Vereinfachte UserStory Methoden
    public void setCurrentUserStory(UserStory userStory) {
        addUserStory(userStory);     // Dies stellt sicher dass die Story in der Liste ist
        this.currentUserStory = userStory;
    }

    public void addUserStory(UserStory userStory) {
        if (!userStories.contains(userStory)) {
            userStories.add(userStory);
        }
    }

    // Getter für databaseId
    public Long getDatabaseId() {
        return databaseId;
    }

    // Setter für databaseId
    public void setDatabaseId(Long databaseId) {
        this.databaseId = databaseId;
    }
}
