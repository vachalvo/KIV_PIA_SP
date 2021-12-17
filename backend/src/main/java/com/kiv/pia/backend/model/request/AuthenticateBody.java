package com.kiv.pia.backend.model.request;

import com.kiv.pia.backend.constants.FormConst;
import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AuthenticateBody {

    @NotBlank(message = FormConst.EMAIL_IS_BLANK)
    private String email;

    @NotBlank(message = FormConst.PASSWORD_IS_BLANK)
    private String password;
}
