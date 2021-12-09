package com.kiv.pia.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "POSTS")
@Getter
@Setter
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    @Column(name = "content")
    private String content;

    @Column(name = "header")
    private String header;

    @Column(name = "date_time_of_published")
    private LocalDateTime dateTimeOfPublished;

    @Column(name = "announcement")
    private Boolean announcement;

    @ManyToOne
    private User user;

    public Post(String header, String content, LocalDateTime dateTimeOfPublished, User user, Boolean announcement) {
        this.content = content;
        this.header = header;
        this.dateTimeOfPublished = dateTimeOfPublished;
        this.user = user;
        this.announcement = announcement;
    }
}
