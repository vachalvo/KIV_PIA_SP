package com.kiv.pia.backend.model.response;

import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.enums.FriendshipType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class SearchResultResponse {
    private User user;
    private UUID friendshipId;
    private FriendshipType friendshipType;
    private boolean isSource;
}
