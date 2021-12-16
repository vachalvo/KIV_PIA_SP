package com.kiv.pia.backend.model;

import com.kiv.pia.backend.helpers.constants.UserConst;
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

    @Column(name = "email", length = UserConst.EMAIL_MAX_LENGTH, nullable = false, unique = true)
    private String email;

    @Column(name = "name", length = UserConst.FIRST_NAME_MAX_LENGTH + UserConst.LAST_NAME_MAX_LENGTH, nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    private GenderType gender;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "users_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = Collections.emptySet();

    public User(String email, String password, String name, GenderType gender) {
        this.password = password;
        this.email = email;
        this.name = name;
        this.gender = gender;
    }
}
