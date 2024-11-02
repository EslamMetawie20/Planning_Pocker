

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
        inputSession.setName("Test Session");
        // Setzen Sie hier weitere notwendige Eigenschaften

        Session savedSession = new Session();
        savedSession.setId(1L);
        savedSession.setName("Test Session");

        // Setzen Sie hier weitere notwendige Eigenschaften

        when(sessionService.save(any(Session.class))).thenReturn(savedSession);

        // Act & Assert
        mockMvc.perform(post("/api/sessions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(inputSession)))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.id").value("1"))
                .andExpect(jsonPath("$.name").value("Test Session"));
    }

    @Test
    void shouldReturnBadRequestForInvalidSession() throws Exception {
        // Arrange
        Session invalidSession = new Session();

        // Lassen Sie erforderliche Felder leer

        // Act & Assert
        mockMvc.perform(post("/api/sessions")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidSession)))
                .andExpect(status().isBadRequest());
    }


}