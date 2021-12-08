package com.kiv.pia.backend.service;

import org.springframework.http.ResponseEntity;

public interface IFormService {

    ResponseEntity<?> validateEmail(String email);
    ResponseEntity<?> validatePassword(String password);
    ResponseEntity<?> validateReEnterPassword(String password);
    ResponseEntity<?> validatePasswords(String password1, String password2);
    ResponseEntity<?> validateFirstName(String name);
    ResponseEntity<?> validateLastName(String name);
    ResponseEntity<?> validateGender(String gender);
}
