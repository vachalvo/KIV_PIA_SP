package com.kiv.pia.backend.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "ROLES")
@Getter
@Setter
@NoArgsConstructor
public class Role {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    private UUID id;

    @Column(length = 20, nullable = false, name = "name")
    private String name;

    public Role(String name) {
        this.name = name;
    }
}