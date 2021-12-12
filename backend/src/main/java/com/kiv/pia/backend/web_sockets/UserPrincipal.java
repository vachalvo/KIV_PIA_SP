package com.kiv.pia.backend.web_sockets;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.security.Principal;

@Data
@AllArgsConstructor
public class UserPrincipal implements Principal {
    String name;
}