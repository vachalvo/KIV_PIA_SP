package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.response.EntityFieldError;
import com.kiv.pia.backend.model.response.FieldErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.*;
import java.util.stream.Collectors;

@ControllerAdvice
public class ErrorHandlerController extends ResponseEntityExceptionHandler {

    private static final Logger log = LoggerFactory.getLogger(ResponseEntityExceptionHandler.class);

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
                                                                  HttpStatus status, WebRequest request) {
        FieldErrorResponse fieldErrorResponse = new FieldErrorResponse();

        log.info("Field error handle!");

        Map<String, EntityFieldError> blankErrors = new HashMap<>();
        Map<String, EntityFieldError> sizeErrors = new HashMap<>();
        Map<String, EntityFieldError> patternErrors = new HashMap<>();
        Map<String, EntityFieldError> notSameErrors = new HashMap<>();
        Map<String, EntityFieldError> uknownErrors = new HashMap<>();

        ex.getBindingResult().getAllErrors().forEach((error) -> {
            EntityFieldError fieldError = new EntityFieldError();
            fieldError.setMessage(error.getDefaultMessage());
            fieldError.setField(((FieldError) error).getField());

            switch (Objects.requireNonNull(error.getCode())){
                case "NotBlank":
                    blankErrors.put(fieldError.getField(), fieldError);
                    break;
                case "Size":
                    sizeErrors.put(fieldError.getField(), fieldError);
                    break;
                case "Email":
                    patternErrors.put(fieldError.getField(), fieldError);
                    break;
                case "NotSame":
                    notSameErrors.put(fieldError.getField(), fieldError);
                    break;
                default:
                    uknownErrors.put(fieldError.getField(), fieldError);
                    break;
            }
        });

        Map<String, EntityFieldError> completeErrors = new HashMap<>();
        addErrors(completeErrors, uknownErrors);
        addErrors(completeErrors, notSameErrors);
        addErrors(completeErrors, patternErrors);
        addErrors(completeErrors, sizeErrors);
        addErrors(completeErrors, blankErrors);

        fieldErrorResponse.setFieldErrors(new ArrayList<>(completeErrors.values()));
        return new ResponseEntity<>(fieldErrorResponse, status);
    }

    private void addErrors(Map<String, EntityFieldError> completeErrors, Map<String, EntityFieldError> parts) {
        for (String s : parts.keySet()) {
            completeErrors.put(s, parts.get(s));
        }
    }
}