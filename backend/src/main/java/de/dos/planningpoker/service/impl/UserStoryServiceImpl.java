package de.dos.planningpoker.service.impl;

import de.dos.planningpoker.model.UserStory;
import de.dos.planningpoker.repository.UserStoryRepository;
import de.dos.planningpoker.service.UserStoryService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class UserStoryServiceImpl implements UserStoryService {
    private final UserStoryRepository userStoryRepository;

    public UserStoryServiceImpl(UserStoryRepository userStoryRepository) {
        this.userStoryRepository = userStoryRepository;
    }

    @Override
    public UserStory getUserStoryById(Long id) {
        return userStoryRepository.findById(id).orElse(null);
    }

    @Override
    public List<UserStory> getUserStories() {
        return userStoryRepository.findAll();
    }

    @Override
    public UserStory saveUserStory(UserStory userStory) {
        if(userStory == null){
            throw new IllegalArgumentException("userStory cannot be null");
        }
        return userStoryRepository.save(userStory);
    }

    @Override
    public void deleteUserStoryById(Long id) {
        if(!userStoryRepository.existsById(id)) {
            throw new EntityNotFoundException("User Story not found with id " + id);
        }
        userStoryRepository.deleteById(id);
    }

    @Override
    public UserStory updateUserStoryById(Long id, UserStory userStory) {
        UserStory managedUserStory = this.getUserStoryById(id);
        managedUserStory.setTitle(userStory.getTitle());
        managedUserStory.setEstimation(userStory.getEstimation());
        managedUserStory.setDescription(userStory.getDescription());

        return this.saveUserStory(managedUserStory);
    }
}
