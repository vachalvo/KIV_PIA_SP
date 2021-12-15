package com.kiv.pia.backend.web_sockets.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserConnect {
    private String id;
    private Boolean isOnline;
}
