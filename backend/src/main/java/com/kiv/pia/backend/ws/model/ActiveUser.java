package com.kiv.pia.backend.ws.model;

import com.kiv.pia.backend.model.enums.GenderType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class ActiveUser {
    private UUID id;
    private String email;
    private String name;
    private GenderType gender;
    private Boolean isOnline;
}
