package com.kiv.pia.backend.model;

import com.kiv.pia.backend.helpers.constants.PostConst;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.event.spi.PostCollectionRecreateEvent;

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

    @Column(name = "content", length = PostConst.CONTENT_MAX_SIZE)
    private String content;

    @Column(name = "header", length = PostConst.HEADER_MAX_SIZE)
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
