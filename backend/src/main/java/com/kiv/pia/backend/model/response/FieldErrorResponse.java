package com.kiv.pia.backend.model.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class FieldErrorResponse {
    private List<EntityFieldError> fieldErrors;
}