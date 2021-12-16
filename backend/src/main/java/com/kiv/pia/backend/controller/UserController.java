package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.mapper.UserMapper;
import com.kiv.pia.backend.model.*;
import com.kiv.pia.backend.model.enums.RoleType;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.model.response.SearchResultResponse;
import com.kiv.pia.backend.security.services.UserDetailsImpl;
import com.kiv.pia.backend.service.IFriendshipService;
import com.kiv.pia.backend.service.IRoleService;
import com.kiv.pia.backend.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    private final UserMapper userMapper = new UserMapper();

    @Autowired
    private IUserService userService;

    @Autowired
    private IFriendshipService friendshipService;

    @Autowired
    private IRoleService roleService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") UUID id){
        User user = userService.findById(id);

        if(user == null){
            log.info("User with id " + id + " not found");

            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("User does not exist!"));
        }

        return ResponseEntity.ok().body(user);
    }

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll(){
        log.info("All users get");

        List<User> users = (List<User>) userService.findAll();

        return ResponseEntity.ok(users);
    }

    @GetMapping("/find-all/{name}")
    public ResponseEntity<?> findAll(@PathVariable String name){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        log.info("User with id " + userDetails.getId() + " want all user with name like " + name);

        User user = userService.findById(userDetails.getId());
        if(user == null){
            log.info("User with id " + userDetails.getId() + " not found");
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("User does not exist!"));
        }


        List<SearchResultResponse> searchResult = new ArrayList<>();
        List<User> users = new ArrayList<>(userService.findByName(user.getId(), name));
        for(User u : users){
            List<Friendship> f = new ArrayList<>();
            Collection<Friendship> bySource = friendshipService.findAll(user.getId(), u.getId());
            Collection<Friendship> byEnd = friendshipService.findAll(u.getId(), user.getId());
            f.addAll(bySource);
            f.addAll(byEnd);

            searchResult.add(userMapper.toSearchResultResponse(u, f, user));
        }

        log.info("Find all users with name like " + name + " result: " + searchResult);
        return ResponseEntity.ok().body(searchResult);
    }

    @PutMapping("/promote/{id}")
    public ResponseEntity<?> promote(@PathVariable UUID id){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        log.info("User with id " + userDetails.getId() + " want to promote user with id " + id + ".");

        User user = userService.findById(userDetails.getId());
        User targetUser = userService.findById(id);
        if(user == null || targetUser == null){
            log.info("User with id " + userDetails.getId() + " or " + id + " not found");
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("User does not exist!"));
        }

        if(!userService.hasRole(user, RoleType.ROLE_ADMIN)) {
            log.info("User with id " + userDetails.getId() + " do not have admin role");
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("User does not have admin permissions!"));
        }
        if(userService.hasRole(targetUser, RoleType.ROLE_ADMIN)) {
            log.info("User with id " + id + " is already admin.");
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("User is already is admin!"));
        }

        Role adminRole = roleService.findByType(RoleType.ROLE_ADMIN);
        User result = userService.promoteUser(targetUser, adminRole);

        log.info("User with id " + userDetails.getId() + " promote user with id " + id );

        return ResponseEntity.ok().body(result);
    }

    @PutMapping("/demote/{id}")
    public ResponseEntity<?> demote(@PathVariable UUID id){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        log.info("User with id " + userDetails.getId() + " want to demote user with id " + id + ".");

        User user = userService.findById(userDetails.getId());
        User targetUser = userService.findById(id);
        if(user == null || targetUser == null){
            log.info("User with id " + userDetails.getId() + " or " + id + " not found");
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("User does not exist!"));
        }

        if(!userService.hasRole(user, RoleType.ROLE_ADMIN)) {
            log.info("User with id " + userDetails.getId() + " do not have admin role");
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("User does not have admin permissions!"));
        }
        if(!userService.hasRole(targetUser, RoleType.ROLE_ADMIN)) {
            log.info("User with id " + id + " is already not admin.");
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("User is already not admin!"));
        }

        Role adminRole = roleService.findByType(RoleType.ROLE_ADMIN);
        User result = userService.demoteUser(targetUser, adminRole);

        log.info("User with id " + userDetails.getId() + " demote user with id " + id );

        return ResponseEntity.ok().body(result);
    }
}
