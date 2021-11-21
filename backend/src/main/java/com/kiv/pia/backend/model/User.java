package com.kiv.pia.backend.model;

import com.kiv.pia.backend.model.enums.FriendshipType;
import com.kiv.pia.backend.model.enums.GenderType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Collections;

import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "USERS")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", length = 70, nullable = false, unique = true)
    private String email;

    @Column(name = "first_Name", length = 50, nullable = false)
    private String firstName;

    @Column(name = "last_Name", length = 50, nullable = false)
    private String lastName;

    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = Collections.emptySet();

    public User(String email, String password, String firstName, String lastName, GenderType gender) {
        this.password = password;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
    }
}
