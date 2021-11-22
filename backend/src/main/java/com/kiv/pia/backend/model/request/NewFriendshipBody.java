package com.kiv.pia.backend.model.request;

import com.kiv.pia.backend.helpers.constants.FriendshipConst;
import com.kiv.pia.backend.model.enums.FriendshipType;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Data
public class NewFriendshipBody {

    @NotBlank(message = FriendshipConst.END_ID_IS_BLANK)
    private UUID endId;

    @NotBlank(message = FriendshipConst.FRIENDSHIP_TYPE_IS_BLANK)
    private FriendshipType friendshipType;
}
