package com.kiv.pia.backend.model.request;

import com.kiv.pia.backend.helpers.constants.PostConst;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Data
public class PostCreateBody {
    @NotBlank(message = PostConst.HEADER_IS_BLANK)
    @Size(min = 3, max = PostConst.HEADER_MAX_SIZE, message = PostConst.HEADER_SIZE)
    private String header;

    @NotBlank(message = PostConst.CONTENT_IS_BLANK)
    @Size(min = 3, max = PostConst.CONTENT_MAX_SIZE, message = PostConst.CONTENT_SIZE)
    private String content;

    private Boolean announcement;
}
