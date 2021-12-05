package com.kiv.pia.backend.model.response;

import com.kiv.pia.backend.model.enums.GenderType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
public class FriendshipListResponseEntity {
    private UUID id;
    private UUID userId;
    private String name;
    private String email;
    private GenderType gender;
    private List<String> roles;
}
