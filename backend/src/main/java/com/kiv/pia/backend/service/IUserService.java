package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.User;

import java.util.List;
import java.util.UUID;

public interface IUserService {
    public User createUser(User user);
    public User getUser(UUID id);
    public List<User> getAllUsers();
}
