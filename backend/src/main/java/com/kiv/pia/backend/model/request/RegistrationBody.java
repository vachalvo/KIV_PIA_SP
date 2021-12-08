package com.kiv.pia.backend.model.request;

import com.kiv.pia.backend.helpers.constants.FormConst;
import com.kiv.pia.backend.helpers.validation.annotations.NotSame;
import lombok.Data;

import javax.validation.constraints.*;

@NotSame.List({
        @NotSame(
                field = "reEnterPassword",
                fieldMatch = "password",
                message = FormConst.RE_ENTER_PASSWORD_NOT_SAME
        )
})
@Data
public class RegistrationBody {
    @NotBlank(message = FormConst.EMAIL_IS_BLANK)
    @Size(min = 5, max = 50, message = FormConst.EMAIL_SIZE)
    @Pattern(regexp = "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])", message = FormConst.EMAIL_PATTERN)
    private String email;

    @NotBlank(message = FormConst.FIRST_NAME_IS_BLANK)
    @Size(min = 3, max = 30, message = FormConst.FIRST_NAME_SIZE)
    @Pattern(regexp = "^[a-zA-z]{3,30}$", message = FormConst.FIRST_NAME_PATTERN)
    private String firstName;

    @NotBlank(message = FormConst.LAST_NAME_IS_BLANK)
    @Size(min = 3, max = 30, message = FormConst.LAST_NAME_SIZE)
    @Pattern(regexp = "^[a-zA-z]{3,30}$", message = FormConst.LAST_NAME_PATTERN)
    private String lastName;

    @NotBlank(message = FormConst.PASSWORD_IS_BLANK)
    @Size(min = 5, max = 30, message = FormConst.PASSWORD_SIZE)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,30}$", message = FormConst.PASSWORD_PATTERN)
    private String password;
    
    @NotBlank(message = FormConst.RE_ENTER_PASSWORD_IS_BLANK)
    @Size(min = 5, max = 30, message = FormConst.RE_ENTER_PASSWORD_SIZE)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,30}$", message = FormConst.RE_ENTER_PASSWORD_PATTERN)
    private String reEnterPassword;

    @NotBlank(message = FormConst.GENDER_IS_BLANK)
    private String gender;
}
