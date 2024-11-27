package de.dos.planningpoker.model.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;




@Getter
@Setter
@Entity
@Table(name = "userstory")
public class UserStory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JoinColumn(name = "session_id")
    @JsonBackReference
    private Session session;

    @Column(name = "estimation")
    private Integer estimation;


}
