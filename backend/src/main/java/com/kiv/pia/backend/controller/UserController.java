package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.config.JwtTokenProvider;
import com.kiv.pia.backend.model.*;
import com.kiv.pia.backend.model.request.AuthenticateBody;
import com.kiv.pia.backend.model.request.RegistrationBody;
import com.kiv.pia.backend.repository.RoleRepository;
import com.kiv.pia.backend.repository.UserRepository;
import com.kiv.pia.backend.service.IService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private static Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private IService<User, UUID> userService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping(value = "/register", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> register(@RequestBody RegistrationBody body) {
        User user = new User(body.getEmail(), body.getPassword(), body.getFirstName(), body.getLastName());
        log.info("UserResourceImpl : register");
        JSONObject jsonObject = new JSONObject();
        try {
            user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
            user.setRole(roleRepository.findByName(RoleType.ROLE_USER.getName()));

            User savedUser = userRepository.save(user);
            jsonObject.put("message", savedUser.getEmail() + " saved succesfully");
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping(value = "/authenticate", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> authenticate(@RequestBody AuthenticateBody body) {
        log.info("UserResourceImpl : authenticate");
        JSONObject jsonObject = new JSONObject();
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword()));
            if (authentication.isAuthenticated()) {
                String email = body.getEmail();
                jsonObject.put("name", authentication.getName());
                jsonObject.put("authorities", authentication.getAuthorities());
                jsonObject.put("token", tokenProvider.createToken(email, new Role(RoleType.ROLE_USER.getName())));
                return new ResponseEntity<>(jsonObject.toString(), HttpStatus.OK);
            }
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
        return null;
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id")UUID id){
        return userService.findById(id).orElse(null);
    }

    @GetMapping("/findAll")
    public List<User> findAll(){
        return (List<User>) userService.findAll();
    }
}
