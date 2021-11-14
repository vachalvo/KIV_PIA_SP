package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.enums.GenderType;
import com.kiv.pia.backend.model.enums.RoleType;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.request.AuthenticateBody;
import com.kiv.pia.backend.model.request.OrderedChecks;
import com.kiv.pia.backend.model.request.RegistrationBody;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.model.response.JwtResponse;
import com.kiv.pia.backend.model.response.MessageResponse;
import com.kiv.pia.backend.repository.RoleRepository;
import com.kiv.pia.backend.repository.UserRepository;
import com.kiv.pia.backend.security.jwt.JwtUtils;
import com.kiv.pia.backend.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin()
@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthenticateBody body) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Validated(OrderedChecks.class) @RequestBody RegistrationBody signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()),
                signUpRequest.getFirstName(),
                signUpRequest.getLastName(),
                signUpRequest.getGender().equals("male") ? GenderType.MALE.getName() : GenderType.FEMALE.getName());

        Set<Role> roles = new HashSet<>();
        Role role = roleRepository.findByName(RoleType.ROLE_USER.getName());

        if(role == null){
            throw new RuntimeException("Role was not found!");
        }

        roles.add(role);
        user.setRoles(roles);

        userRepository.save(user);

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }
}
