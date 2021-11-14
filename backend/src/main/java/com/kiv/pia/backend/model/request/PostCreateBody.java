package com.kiv.pia.backend.model.request;

import com.kiv.pia.backend.helpers.constants.UserConst;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Past;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class PostCreateBody {

    @NotBlank(message = UserConst.EMAIL_IS_BLANK)
    private String header;

    @NotBlank(message = UserConst.EMAIL_IS_BLANK)
    private String content;

    @Past(message = UserConst.EMAIL_IS_BLANK)
    private LocalDateTime dateTimeOfPublished;

    @NotBlank(message = UserConst.EMAIL_IS_BLANK)
    private String user;
}
