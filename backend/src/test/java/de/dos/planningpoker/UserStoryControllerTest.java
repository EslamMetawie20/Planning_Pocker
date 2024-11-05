package de.dos.planningpoker;

import de.dos.planningpoker.controller.UserStoryController;
import de.dos.planningpoker.model.Session;
import de.dos.planningpoker.model.UserStory;
import de.dos.planningpoker.service.UserStoryService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserStoryController.class)
public class UserStoryControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserStoryService userStoryService;

    @Test
    void testGetUserStory() throws Exception {
        Session session = new Session();
        UserStory userStory1 = new UserStory();
        UserStory userStory2 = new UserStory();

        userStory1.setId(1L);
        userStory1.setTitle("userstory 1");
        userStory1.setDescription("userstory 1");
        userStory1.setEstimation(5);
        userStory1.setSession(session);

        userStory2.setId(2L);
        userStory2.setTitle("userstory 2");
        userStory2.setDescription("userstory 2");
        userStory2.setEstimation(4);
        userStory2.setSession(session);

        List<UserStory> userStories = Arrays.asList(userStory1, userStory2);

        when(userStoryService.getUserStories()).thenReturn(userStories);

        mockMvc.perform(get("/api/userstorys"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(userStories.size()))
                .andExpect(jsonPath("$[0].id").value(userStory1.getId()))
                .andExpect(jsonPath("$[1].id").value(userStory2.getId()));

        verify(userStoryService, times(1)).getUserStories();
    }

    @Test
    void testCreateUserStory() throws Exception {
        mockMvc.perform(post("/api/userstorys")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\": \"New User Story\", \"description\": \"New Description\"}"))
                .andExpect(status().isOk());
        verify(userStoryService, times(1)).saveUserStory(any(UserStory.class));
    }
    @Test
    void testDeleteUserStory() throws Exception {
        Long userStoryId = 1L;

        mockMvc.perform(delete("/api/userstorys/{id}" , userStoryId))
                .andExpect(status().isNoContent());

        verify(userStoryService, times(1)).deleteUserStoryById(userStoryId);
    }
    @Test
    void testUpdateUserStory() throws Exception {
        Long userStoryId = 1L;

        mockMvc.perform(put("/api/userstorys/{id}" , userStoryId)
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"title\": \"Updated User Story\", \"description\": \"Updated Description\"}"))
                .andExpect(status().isOk());

        verify(userStoryService, times(1)).updateUserStoryById(eq(userStoryId), any(UserStory.class));
    }
}
