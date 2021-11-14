package com.kiv.pia.backend.model.request;

import com.kiv.pia.backend.helpers.constants.UserConst;
import com.kiv.pia.backend.helpers.validation.annotations.NotSame;
import lombok.Data;

import javax.validation.constraints.*;
interface FirstCheckGroup {}
interface SecondCheckGroup {}
interface ThirdCheckGroup {}

@NotSame.List({
        @NotSame(
                groups = ThirdCheckGroup.class,
                field = "reEnterPassword",
                fieldMatch = "password",
                message = UserConst.RE_ENTER_PASSWORD_NOT_SAME
        )
})
@Data
public class RegistrationBody {
    @NotBlank(message = UserConst.EMAIL_IS_BLANK, groups = FirstCheckGroup.class)
    @Size(min = 5, max = 50, message = UserConst.EMAIL_SIZE, groups = SecondCheckGroup.class)
    @Pattern(groups = ThirdCheckGroup.class, regexp = "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])", message = UserConst.EMAIL_PATTERN)
    private String email;

    @NotBlank(message = UserConst.FIRST_NAME_IS_BLANK, groups = FirstCheckGroup.class)
    @Size(min = 3, max = 30, message = UserConst.FIRST_NAME_SIZE, groups = SecondCheckGroup.class)
    @Pattern(regexp = "^[a-zA-z]{3,30}$", message = UserConst.FIRST_NAME_PATTERN, groups = ThirdCheckGroup.class)
    private String firstName;

    @NotBlank(message = UserConst.LAST_NAME_IS_BLANK, groups = FirstCheckGroup.class)
    @Size(min = 3, max = 30, message = UserConst.LAST_NAME_SIZE, groups = SecondCheckGroup.class)
    @Pattern(regexp = "^[a-zA-z]{3,30}$", message = UserConst.LAST_NAME_PATTERN, groups = ThirdCheckGroup.class)
    private String lastName;

    @NotBlank(message = UserConst.PASSWORD_IS_BLANK, groups = FirstCheckGroup.class)
    @Size(min = 5, max = 30, message = UserConst.PASSWORD_SIZE, groups = SecondCheckGroup.class)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,30}$", message = UserConst.PASSWORD_PATTERN, groups = ThirdCheckGroup.class)
    private String password;
    
    @NotBlank(message = UserConst.RE_ENTER_PASSWORD_IS_BLANK, groups = FirstCheckGroup.class)
    @Size(min = 5, max = 30, message = UserConst.RE_ENTER_PASSWORD_SIZE, groups = SecondCheckGroup.class)
    @Pattern(regexp = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{5,30}$", message = UserConst.RE_ENTER_PASSWORD_PATTERN, groups = ThirdCheckGroup.class)
    private String reEnterPassword;

    @NotBlank(groups = FirstCheckGroup.class)
    private String gender;
}
