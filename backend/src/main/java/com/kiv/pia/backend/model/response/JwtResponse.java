package com.kiv.pia.backend.model.response;

import com.kiv.pia.backend.model.User;
import lombok.Data;

import java.util.UUID;

@Data
public class JwtResponse {
    private String token;
    private User user;
    private boolean isAdmin;

    public JwtResponse(String token, User user, boolean isAdmin) {
        this.token = token;
        this.user = user;
        this.isAdmin = isAdmin;
    }
}
