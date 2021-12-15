package com.kiv.pia.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "CHAT_MESSAGE")
@Getter
@Setter
@NoArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    @Column(name = "text")
    private String text;

    @Column(name = "message_time")
    private LocalDateTime time;

    @ManyToOne
    @JoinColumn(name = "from_user", referencedColumnName = "id")
    private User from;

    @ManyToOne
    @JoinColumn(name = "recipient", referencedColumnName = "id")
    private User recipient;

    public ChatMessage(User from, User recipient, String text, LocalDateTime time){
        this.from = from;
        this.recipient = recipient;
        this.text = text;
        this.time = time;
    }
}
