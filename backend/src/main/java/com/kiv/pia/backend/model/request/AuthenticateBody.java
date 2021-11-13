package com.kiv.pia.backend.model.request;

import com.kiv.pia.backend.helpers.constants.UserConst;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
public class AuthenticateBody {

    @NotBlank(message = UserConst.EMAIL_IS_BLANK)
    @Size(min = 5, max = 50, message = UserConst.EMAIL_SIZE)
    @Pattern(regexp = "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])", message = UserConst.EMAIL_PATTERN)
    private String email;

    @NotBlank(message = UserConst.PASSWORD_IS_BLANK)
    @Size(min = 5, max = 30, message = UserConst.PASSWORD_SIZE)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,30}$", message = UserConst.PASSWORD_PATTERN)
    private String password;
}
