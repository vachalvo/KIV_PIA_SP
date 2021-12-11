package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.helpers.constants.FormConst;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.service.IFormService;
import com.kiv.pia.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/forms")
@CrossOrigin("http://localhost:3000")
public class FormController {

    @Autowired
    private IUserService userService;

    @Autowired
    private IFormService formService;

    @GetMapping("/login/email")
    public ResponseEntity<?> validateLoginEmail(@RequestParam(value = "email", defaultValue = "") String email) {
        ResponseEntity<?> response = formService.validateEmail(email);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/registration/email")
    public ResponseEntity<?> validateRegistrationEmail(@RequestParam(value = "email", defaultValue = "") String email) {
        ResponseEntity<?> response = formService.validateEmail(email);
        if(response != null){
            return response;
        }

        User user = userService.findByEmail(email);
        if (user != null){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse(FormConst.EMAIL_ALREADY_IN_USE));
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/firstName")
    public ResponseEntity<?> validateFirstName(@RequestParam(value = "firstName", defaultValue = "") String firstName) {
        ResponseEntity<?> response = formService.validateFirstName(firstName);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/lastName")
    public ResponseEntity<?> validateLastName(@RequestParam(value = "lastName", defaultValue = "") String lastName) {
        ResponseEntity<?> response = formService.validateLastName(lastName);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/gender")
    public ResponseEntity<?> validateGender(@RequestParam(value = "gender", defaultValue = "") String gender) {
        ResponseEntity<?> response = formService.validateGender(gender);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/password")
    public ResponseEntity<?> validatePassword(@RequestParam(value = "password", defaultValue = "") String password) {
        ResponseEntity<?> response = formService.validatePassword(password);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }


    @GetMapping("/reEnterPassword")
    public ResponseEntity<?> validateReEnterPassword(@RequestParam(value = "reEnterPassword", defaultValue = "") String reEnterPassword) {
        ResponseEntity<?> response = formService.validateReEnterPassword(reEnterPassword);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }

    @GetMapping("/passwords")
    public ResponseEntity<?> validateRegistrationPassword(@RequestParam(value = "password", defaultValue = "") String password,
                                                          @RequestParam(value = "reEnterPassword", defaultValue = "") String reEnterPassword) {
        ResponseEntity<?> response = formService.validatePasswords(password, reEnterPassword);
        if(response != null){
            return response;
        }

        return ResponseEntity.ok().body(Boolean.TRUE);
    }
}
