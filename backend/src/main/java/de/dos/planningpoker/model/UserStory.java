package de.dos.planningpoker.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "userStory")

public class UserStory {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "userStory_id")
    private Long userStoryId;

    @Column(name = "userStory_estimate")
    private Integer userStoryEstimate;
    @Column(name = "userStory_name")
    private String userStoryName;
    @Column(name = "userStory_decription")
    private String userStoryDescription;
    @Column(name = "userStory_sessionId")
    private Long sessionId;

}
