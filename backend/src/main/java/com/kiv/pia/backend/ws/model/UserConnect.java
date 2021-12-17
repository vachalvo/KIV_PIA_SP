package com.kiv.pia.backend.ws.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserConnect {
    private String id;
    private Boolean isOnline;
}
