package de.dos.planningpoker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "session")
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "session_id")
    private Long id;
    @NotNull(message = "Position is required")
    @Min(value = 0, message = "Position must be zero or positive")
    private String position;
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<UserStory> userStories = new ArrayList<>();


}
