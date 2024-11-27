package de.dos.planningpoker.controller;
import de.dos.planningpoker.model.entity.Session;
import de.dos.planningpoker.service.SessionService;
import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
@RequestMapping("/api/sessions")
public class SessionController {
    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE,  produces = MediaType.APPLICATION_JSON_VALUE)
    public Session save(@Valid @RequestBody Session session) {return sessionService.save(session);}

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Session> get() {
        return sessionService.getAll();
    }
}


