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

    @Column(name = "dateTimeOfPublished")
    private LocalDateTime dateTimeOfPublished;

    public Post(String header, String content, LocalDateTime dateTimeOfPublished) {
        this.content = content;
        this.header = header;
        this.dateTimeOfPublished = dateTimeOfPublished;
    }
}
