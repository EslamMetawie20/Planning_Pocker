package de.dos.planningpoker.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
    @NotBlank(message = "session name soll nicht leer sein")
    @Column(name = "session_name", nullable = false)
    private String name;
    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    @OrderBy("position ASC")  // Sortiert UserStories nach Position
    private List<UserStory> userStories = new ArrayList<>();


}
