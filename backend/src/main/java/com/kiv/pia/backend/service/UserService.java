package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.User;

import java.util.List;

public interface UserService {
    public User updateUser(User user);
    public List<User> getAllUsers();
}
