package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.enums.RoleType;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IRoleService {
    Collection<Role> findAll();

    Optional<Role> findById(UUID id);

    Role saveOrUpdate(Role role);

    void deleteById(UUID id);

    Role findByType(RoleType roleAdmin);
}
