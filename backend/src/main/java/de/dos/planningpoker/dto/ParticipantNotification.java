package de.dos.planningpoker.dto;

import de.dos.planningpoker.enumeration.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ParticipantNotification {
    private String username;
    private NotificationType type;

    @Override
    public String toString() {
        return "username='" + username + type + "the session";
    }
}
