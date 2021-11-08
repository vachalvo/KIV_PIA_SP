package com.kiv.pia.backend.model.request;

import lombok.Data;

@Data
public class RegistrationBody {

    private String email;

    private String firstName;

    private String lastName;

    private String password;

    private String reEnterPassword;
}
