package com.kiv.pia.backend.model.request;

import com.kiv.pia.backend.constants.FriendshipConst;
import com.kiv.pia.backend.model.enums.FriendshipState;
import lombok.Data;

import javax.validation.constraints.NotNull;
import java.util.UUID;

@Data
public class FriendshipCollaborationBody {

    @NotNull(message = FriendshipConst.FRIENDSHIP_TYPE_IS_BLANK)
    private UUID friendshipId;

    @NotNull(message = FriendshipConst.FRIENDSHIP_TYPE_IS_BLANK)
    private FriendshipState friendshipState;
}
