package de.dos.planningpoker.dto;

import lombok.Data;

@Data
public class LeaveRequest {
    private String sessionId;
    String userId;
}
