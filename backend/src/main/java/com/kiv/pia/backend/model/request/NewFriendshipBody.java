package com.kiv.pia.backend.model.request;

import com.kiv.pia.backend.helpers.constants.FriendshipConst;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import java.util.UUID;

@Data
public class NewFriendshipBody {

    @NotEmpty(message = FriendshipConst.END_ID_IS_BLANK)
    private UUID endId;
}
