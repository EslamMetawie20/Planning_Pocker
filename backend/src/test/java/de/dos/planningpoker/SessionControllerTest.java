

package de.dos.planningpoker;

import com.fasterxml.jackson.databind.ObjectMapper;
import de.dos.planningpoker.controller.SessionController;
import de.dos.planningpoker.model.Session;
import de.dos.planningpoker.service.SessionService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(SessionController.class)
class SessionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SessionService sessionService;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void shouldCreateNewSession() throws Exception {
        // Arrange
        Session inputSession = new Session();
        inputSession.setPosition("Scrum Master");
//
        Session savedSession = new Session();
        savedSession.setId(1L);        // Wenn Id vom Typ Long ist
        savedSession.setPosition("Scrum Master");

        when(sessionService.save(any(Session.class))).thenReturn(savedSession);

        // Act & Assert
        mockMvc.perform(post("/api/sessions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputSession)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value(1))    // Wenn Id vom Typ Long ist
                .andExpect(jsonPath("$.position").value("Scrum Master"));
    }

    @Test
    void shouldReturnBadRequestForInvalidSession() throws Exception {
        // Arrange
        Session invalidSession = new Session();
        invalidSession.setId(1L);
        invalidSession.setPosition(null);

        // Act & Assert
        mockMvc.perform(post("/api/sessions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidSession)))
                .andExpect(status().isBadRequest());
    }
}