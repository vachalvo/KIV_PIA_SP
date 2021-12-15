package com.kiv.pia.backend.service.impl;

import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.enums.RoleType;
import com.kiv.pia.backend.repository.UserRepository;
import com.kiv.pia.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Collection<User> findAll() {
        return (Collection<User>) userRepository.findAll();
    }

    @Override
    public User findById(UUID id) {
        Optional<User> user = userRepository.findById(id);
        return user.orElse(null);
    }

    @Override
    public Collection<User> findByName(UUID sourceId, String name) {
        return (Collection<User>) userRepository.findByPartName(name.toLowerCase(), sourceId);
    }

    @Override
    public User findByEmail(String email) {
        Optional<User> user = userRepository.findByEmail(email);
        return user.orElse(null);
    }

    @Override
    public User saveOrUpdate(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteById(UUID id) {
        userRepository.deleteById(id);
    }

    @Override
    public User promoteUser(User targetUser, Role role) {
        targetUser.getRoles().add(role);

        return userRepository.save(targetUser);
    }

    @Override
    public User demoteUser(User targetUser, Role role) {
        targetUser.getRoles().remove(role);

        return userRepository.save(targetUser);
    }

    @Override
    public boolean hasRole(User user, RoleType roleType) {
        for (Role role : user.getRoles()) {
            if(role.getName().equals(roleType)) {
                return true;
            }
        }
        return false;
    }
}
