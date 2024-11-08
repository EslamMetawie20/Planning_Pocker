package de.dos.planningpoker.controller;

import de.dos.planningpoker.model.UserStory;
import de.dos.planningpoker.service.UserStoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller für die Verwaltung von User Stories im Planning Poker System.
 * Stellt Endpunkte für CRUD-Operationen (Create, Read, Update, Delete) von User Stories bereit.
 */
@RestController
@RequestMapping("/api/userstorys")
public class UserStoryController {
    @Autowired
    private UserStoryService userStoryService;
    /**
     * Ruft alle User Stories aus dem System ab.
     *
     * @return Eine Liste aller User Stories
     */
    @GetMapping
    public List<UserStory> getUserStorys() {
        return userStoryService.getUserStories();
    }
    /**
     * Ruft eine spezifische User Story anhand ihrer ID ab.
     *
     * @param id Die ID der gesuchten User Story
     * @return Die gefundene User Story
     */
    @GetMapping("/{id}")
    public UserStory getUserStory(@PathVariable Long id) {
        return userStoryService.getUserStoryById(id);
    }
    /**
     * Fügt eine neue User Story zum System hinzu.
     *
     * @param userStory Die zu speichernde User Story
     */
    @PostMapping
    public void addUserStory(@RequestBody UserStory userStory) {
        userStoryService.saveUserStory(userStory);
    }
    /**
     * Aktualisiert eine bestehende User Story.
     *
     * @param id Die ID der zu aktualisierenden User Story
     * @param userStory Die aktualisierten Daten der User Story
     */
    @PutMapping("/{id}")
    public void updateUserStory(@PathVariable Long id, @RequestBody UserStory userStory) {
        userStoryService.updateUserStoryById(id, userStory);
    }
    /**
     * Löscht eine User Story aus dem System.
     *
     * @param id Die ID der zu löschenden User Story
     */
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserStory(@PathVariable Long id) {
        userStoryService.deleteUserStoryById(id);
    }
}
