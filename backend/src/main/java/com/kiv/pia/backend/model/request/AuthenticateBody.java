package com.kiv.pia.backend.model.request;

import lombok.Data;

@Data
public class AuthenticateBody {

    private String email;

    private String password;
}
