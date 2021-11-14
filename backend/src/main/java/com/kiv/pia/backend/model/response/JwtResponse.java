package com.kiv.pia.backend.model.response;

import lombok.Data;

import java.util.UUID;

@Data
public class JwtResponse {
    private String token;
    private UUID id;

    public JwtResponse(String token, UUID id) {
        this.token = token;
        this.id = id;
    }
}
