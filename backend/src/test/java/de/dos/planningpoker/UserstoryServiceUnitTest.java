package de.dos.planningpoker;

import de.dos.planningpoker.model.Session;
import de.dos.planningpoker.model.UserStory;
import de.dos.planningpoker.repository.UserStoryRepository;
import de.dos.planningpoker.service.impl.UserStoryServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
public class UserstoryServiceUnitTest {
    @Mock
    private UserStoryRepository userStoryRepository;

    @InjectMocks
    private UserStoryServiceImpl userStoryService;

    @Test
    void testGetUserStoryById_Found() {
        UserStory userStory = new UserStory();
        userStory.setId(1L);
        when(userStoryRepository.findById(1L)).thenReturn(Optional.of(userStory));

        UserStory result = userStoryService.getUserStoryById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        verify(userStoryRepository).findById(1L);
    }

    @Test
    void testGetUserStoryById_NotFound() {
        when(userStoryRepository.findById(1L)).thenReturn(Optional.empty());

        UserStory result = userStoryService.getUserStoryById(1L);

        assertNull(result);
        verify(userStoryRepository).findById(1L);
    }

    @Test
    void testGetUserStories() {
        UserStory userStory1 = new UserStory();
        UserStory userStory2 = new UserStory();
        when(userStoryRepository.findAll()).thenReturn(Arrays.asList(userStory1, userStory2));

        List<UserStory> result = userStoryService.getUserStories();

        assertNotNull(result);
        assertEquals(2, result.size());
        verify(userStoryRepository).findAll();
    }

    @Test
    void testSaveUserStory() {
        UserStory userStory = new UserStory();
        when(userStoryRepository.save(userStory)).thenReturn(userStory);

        UserStory result = userStoryService.saveUserStory(userStory);

        assertNotNull(result);
        verify(userStoryRepository).save(userStory);
    }
    @Test
    void testSaveUserStory_NullInput(){
        assertThrows(IllegalArgumentException.class, () -> userStoryService.saveUserStory(null));
    }

    @Test
    void testDeleteUserStoryById_storyExists() {
        Long userStoryId = 1L;
        when(userStoryRepository.existsById(userStoryId)).thenReturn(true);

        userStoryService.deleteUserStoryById(userStoryId);

        verify(userStoryRepository).deleteById(userStoryId);
    }
    @Test
    void testDeleteUserStoryById_NotExists() {
        Long nonExistedId = 1L;

        assertThrows(EntityNotFoundException.class, () -> userStoryService.deleteUserStoryById(nonExistedId));

        verify(userStoryRepository, never()).deleteById(nonExistedId);
    }

    @Test
    void testUpdateUserStory() {
        UserStory existingUserStory = new UserStory();
        Session session = new Session();

        existingUserStory.setId(1L);
        existingUserStory.setTitle("old story");
        existingUserStory.setDescription("old story");
        existingUserStory.setEstimation(5);
        existingUserStory.setSession(session);

        UserStory updatedUserStory = new UserStory();
        updatedUserStory.setId(1L);
        updatedUserStory.setTitle("new story");
        updatedUserStory.setDescription("new story");
        updatedUserStory.setEstimation(3);
        updatedUserStory.setSession(session);

        UserStory expectedUserStory = new UserStory();
        expectedUserStory.setId(1L);
        expectedUserStory.setTitle("Updated Title");
        expectedUserStory.setDescription("Updated Description");

        when(userStoryRepository.existsById(1L)).thenReturn(true);
        when(userStoryRepository.findById(1L)).thenReturn(Optional.of(existingUserStory));
        when(userStoryRepository.save(any(UserStory.class))).thenReturn(existingUserStory);


        UserStory result = userStoryService.updateUserStoryById(1L, updatedUserStory);

        assertNotNull(result);
        assertEquals(1L, result.getId());
        assertEquals("new story", result.getTitle());
        assertEquals("new story", result.getDescription());
        assertEquals(3, result.getEstimation());
        verify(userStoryRepository).findById(1L);
        verify(userStoryRepository).save(existingUserStory);
    }
}
