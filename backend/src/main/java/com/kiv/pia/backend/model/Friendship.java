package com.kiv.pia.backend.model;

import com.kiv.pia.backend.model.enums.FriendshipType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "FRIENDSHIP")
@Getter
@Setter
@NoArgsConstructor
public class Friendship {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    @Enumerated(EnumType.STRING)
    private FriendshipType friendshipType;

    @ManyToOne
    @JoinColumn(name = "source_user_id", referencedColumnName = "id")
    private User sourceUser;

    @ManyToOne
    @JoinColumn(name = "end_user_id", referencedColumnName = "id")
    private User endUser;

    public Friendship(User sourceUser, User endUser, FriendshipType friendshipType){
        this.sourceUser = sourceUser;
        this.endUser = endUser;
        this.friendshipType = friendshipType;
    }
}
