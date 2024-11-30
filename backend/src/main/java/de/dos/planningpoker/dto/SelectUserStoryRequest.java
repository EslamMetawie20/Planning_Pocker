package de.dos.planningpoker.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SelectUserStoryRequest {
    private String sessionId;
    private String userCode;
    private String userStoryCode;
}