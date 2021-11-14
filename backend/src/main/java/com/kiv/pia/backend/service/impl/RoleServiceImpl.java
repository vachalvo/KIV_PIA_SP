package com.kiv.pia.backend.service.impl;

import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.repository.RoleRepository;
import com.kiv.pia.backend.service.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Service
public class RoleServiceImpl implements IRoleService {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public Collection<Role> findAll() {
        return (Collection<Role>) roleRepository.findAll();
    }

    @Override
    public Optional<Role> findById(UUID id) {
        return roleRepository.findById(id);
    }

    @Override
    public Role saveOrUpdate(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void deleteById(UUID id) {
        roleRepository.deleteById(id);
    }
}
