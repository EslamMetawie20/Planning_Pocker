package de.dos.planningpoker.dto;

import de.dos.planningpoker.model.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SessionResponse {
    private String sessionId;
    private String scrumMasterName;
    private List<User> participants;
    private String joinUrl;
}
