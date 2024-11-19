package de.dos.planningpoker.dto;

import de.dos.planningpoker.enumeration.Role;
import lombok.Data;

@Data
public class JoinRequest {
    private String sessionId;
    private String userName;
}
