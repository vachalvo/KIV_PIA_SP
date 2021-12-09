package com.kiv.pia.backend.model.response;

import lombok.Data;

import java.util.UUID;

@Data
public class JwtResponse {
    private String token;
    private UUID id;
    private boolean isAdmin;

    public JwtResponse(String token, UUID id, boolean isAdmin) {
        this.token = token;
        this.id = id;
        this.isAdmin = isAdmin;
    }
}
