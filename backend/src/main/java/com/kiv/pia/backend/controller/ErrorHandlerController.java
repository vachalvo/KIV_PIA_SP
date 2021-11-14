package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.response.EntityFieldError;
import com.kiv.pia.backend.model.response.FieldErrorResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class ErrorHandlerController extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
                                                                  HttpStatus status, WebRequest request) {
        FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();

        Map<String, EntityFieldError> fieldErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            EntityFieldError fieldError = new EntityFieldError();
            fieldError.setField(((FieldError) error).getField());
            fieldError.setMessage(error.getDefaultMessage());
            fieldErrors.put(fieldError.getField(), fieldError);
        });

        fieldErrorResponse.setFieldErrors(new ArrayList<>(fieldErrors.values()));
        return new ResponseEntity<>(fieldErrorResponse, status);
    }
}