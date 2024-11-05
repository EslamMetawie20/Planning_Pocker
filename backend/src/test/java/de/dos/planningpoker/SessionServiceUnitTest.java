package de.dos.planningpoker;

import de.dos.planningpoker.model.Session;
import de.dos.planningpoker.repository.SessionRepository;
import de.dos.planningpoker.service.impl.SessionServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class SessionServiceUnitTest {
	@Mock
	private SessionRepository sessionRepository;

	@InjectMocks
	private SessionServiceImpl sessionService;

	@Test
	void createSession_ShouldSaveSession() {
		// Arrange
		Session session = new Session();
		session.setPosition("Scrum Master");
		when(sessionRepository.save(any(Session.class))).thenReturn(session);

		// Act
		Session result = sessionService.save(session);

		// Assert
		assertNotNull(result);
		verify(sessionRepository).save(session);
	}
}