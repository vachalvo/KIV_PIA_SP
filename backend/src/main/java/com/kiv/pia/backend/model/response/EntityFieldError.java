package com.kiv.pia.backend.model.response;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EntityFieldError {
    private String field;
    private String message;
}
