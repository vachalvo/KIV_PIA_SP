package com.kiv.pia.backend.web_sockets;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserConnect {
    private String id;
    private Boolean isOnline;
}
