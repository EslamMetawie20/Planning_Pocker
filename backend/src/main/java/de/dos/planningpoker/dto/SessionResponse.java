package de.dos.planningpoker.dto;

import de.dos.planningpoker.model.websocket.User;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class SessionResponse {
    private String sessionId;
    private String scrumMasterId;
    private String memberId;
    private String scrumMasterName;
    private List<User> participants;
    private String joinUrl;
}
