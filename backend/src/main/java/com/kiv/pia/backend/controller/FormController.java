package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.helpers.constants.FormConst;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.service.IFormService;
import com.kiv.pia.backend.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/forms")
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
public class FormController {

    private static final Logger log = LoggerFactory.getLogger(FormController.class);

    @Autowired
    private IUserService userService;

    @Autowired
    private IFormService formService;

    @GetMapping("/login/email")
    public ResponseEntity<?> validateLoginEmail(@RequestParam(value = "email", defaultValue = "") String email) {
        ResponseEntity<?> response = formService.validateEmail(email);

        log.info("Login email validation: " +  email);

        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/registration/email")
    public ResponseEntity<?> validateRegistrationEmail(@RequestParam(value = "email", defaultValue = "") String email) {
        log.info("Registration email validation: " +  email);

        ResponseEntity<?> response = formService.validateEmail(email);
        if(response != null){
            return response;
        }

        User user = userService.findByEmail(email);
        if (user != null){
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse(FormConst.EMAIL_ALREADY_IN_USE));
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/firstName")
    public ResponseEntity<?> validateFirstName(@RequestParam(value = "firstName", defaultValue = "") String firstName) {
        log.info("First name validation: " + firstName);

        ResponseEntity<?> response = formService.validateFirstName(firstName);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/lastName")
    public ResponseEntity<?> validateLastName(@RequestParam(value = "lastName", defaultValue = "") String lastName) {
        log.info("Last name validation: " + lastName);

        ResponseEntity<?> response = formService.validateLastName(lastName);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/gender")
    public ResponseEntity<?> validateGender(@RequestParam(value = "gender", defaultValue = "") String gender) {
        log.info("Gender validation: " + gender);

        ResponseEntity<?> response = formService.validateGender(gender);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/password")
    public ResponseEntity<?> validatePassword(@RequestParam(value = "password", defaultValue = "") String password) {
        log.info("Password validation: " + password);

        ResponseEntity<?> response = formService.validatePassword(password);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }


    @GetMapping("/reEnterPassword")
    public ResponseEntity<?> validateReEnterPassword(@RequestParam(value = "reEnterPassword", defaultValue = "") String reEnterPassword) {
        log.info("Re-enter password validation: " + reEnterPassword);

        ResponseEntity<?> response = formService.validateReEnterPassword(reEnterPassword);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/passwords")
    public ResponseEntity<?> validateRegistrationPassword(@RequestParam(value = "password", defaultValue = "") String password,
                                                          @RequestParam(value = "reEnterPassword", defaultValue = "") String reEnterPassword) {
        log.info("Passwords validation: " + password + " | " + reEnterPassword);

        ResponseEntity<?> response = formService.validatePasswords(password, reEnterPassword);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }
}
