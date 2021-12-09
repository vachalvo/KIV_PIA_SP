package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.enums.RoleType;

import java.util.Collection;
import java.util.UUID;

public interface IUserService {
    Collection<User> findAll();

    User findById(UUID id);

    Collection<User> findByName(UUID sourceId, String name);

    User findByEmail(String email);

    User saveOrUpdate(User user);

    void deleteById(UUID id);

    User promoteUser(User targetUser, Role role);

    User demoteUser(User targetUser, Role role);

    boolean hasRole(User user, RoleType roleType);
}
