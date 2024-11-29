package de.dos.planningpoker.model.websocket;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class Vote {
    private String userId;
    private Long userStoryId;
    private int estimation;
    private LocalDateTime voteTime;
}