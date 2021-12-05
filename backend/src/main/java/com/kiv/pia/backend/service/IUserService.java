package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.User;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface IUserService {
    Collection<User> findAll();

    User findById(UUID id);

    Collection<User> findByName(UUID sourceId, String name);

    User saveOrUpdate(User role);

    void deleteById(UUID id);
}
