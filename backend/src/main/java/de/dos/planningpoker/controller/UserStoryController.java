package de.dos.planningpoker.controller;

import de.dos.planningpoker.model.UserStory;
import de.dos.planningpoker.service.UserStoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/userstorys")
public class UserStoryController {
    @Autowired
    private UserStoryService userStoryService;

    @GetMapping
    public List<UserStory> getUserStorys() {
        return userStoryService.getUserStories();
    }
    @PostMapping
    public void addUserStory(@RequestBody UserStory userStory) {
        userStoryService.saveUserStory(userStory);
    }
    @PutMapping("/{id}")
    public void updateUserStory(@PathVariable Long id, @RequestBody UserStory userStory) {
        userStoryService.updateUserStoryById(id, userStory);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteUserStory(@PathVariable Long id) {
        userStoryService.deleteUserStoryById(id);
    }
}
