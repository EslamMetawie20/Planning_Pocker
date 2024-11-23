package de.dos.planningpoker.dto;
import lombok.Data;

@Data
public class ReconnectRequest {
    private String sessionId;
    String userId;
}
