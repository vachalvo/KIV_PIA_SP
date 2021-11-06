package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.User;

import java.util.List;
import java.util.UUID;

public interface IRoleService {
    public Role create(Role role);
    public Role find(UUID id);
}
