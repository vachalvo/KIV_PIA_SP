package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.BackendApplication;
import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.enums.GenderType;
import com.kiv.pia.backend.model.enums.RoleType;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.request.AuthenticateBody;
import com.kiv.pia.backend.model.request.RegistrationBody;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.model.response.JwtResponse;
import com.kiv.pia.backend.model.response.MessageResponse;
import com.kiv.pia.backend.repository.RoleRepository;
import com.kiv.pia.backend.repository.UserRepository;
import com.kiv.pia.backend.security.jwt.JwtUtils;
import com.kiv.pia.backend.security.services.UserDetailsImpl;
import com.kiv.pia.backend.service.IRoleService;
import com.kiv.pia.backend.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/auth")
public class AuthController {

    private static final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    IUserService userService;

    @Autowired
    IRoleService roleService;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthenticateBody body) {
        log.info("Login request received: " + body.toString());

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        User user = userService.findById(userDetails.getId());
        if(user == null){
            log.info("Login request rejected: User with id " + userDetails.getId() + " not exists");
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("User does not exists!"));
        }
        ResponseCookie jwtCookie = ResponseCookie.from("JWT_TOKEN", jwt)
                .httpOnly(true)
                .secure(false)
                .maxAge(-1)
                .path("/")
                .build();

        return ResponseEntity
                .ok()
                .header(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, "Set-Cookie")
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Set-Cookie")
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .body(new JwtResponse(jwt, user, roles.contains("ROLE_ADMIN")));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody RegistrationBody signUpRequest) {
        if (userService.findByEmail(signUpRequest.getEmail()) != null) {
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName() + " " + signUpRequest.getLastName(),
                signUpRequest.getGender().equals("MALE") ? GenderType.MALE : GenderType.FEMALE);

        Set<Role> roles = new HashSet<>();
        Role role = roleService.findByType(RoleType.ROLE_USER);

        if(role == null){
            return ResponseEntity.ok(new MessageResponse("Cannot create user! Try it later."));
        }

        roles.add(role);
        user.setRoles(roles);

        userService.saveOrUpdate(user);
        log.info("New user registered with email " + user.getEmail());
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
