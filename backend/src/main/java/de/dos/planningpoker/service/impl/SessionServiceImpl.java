package de.dos.planningpoker.service.impl;

import de.dos.planningpoker.model.entity.Session;
import de.dos.planningpoker.repository.SessionRepository;
import de.dos.planningpoker.service.SessionService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class SessionServiceImpl implements SessionService {
    private final SessionRepository sessionRepository;

    public SessionServiceImpl(SessionRepository sessionRepository) {
        this.sessionRepository = sessionRepository;
    }

    @Override
    public Session save(Session session){
        return sessionRepository.save(session);

    }

    @Override
    public List<Session> getAll(){
        return sessionRepository.findAll();
    }
}
