package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.mapper.UserMapper;
import com.kiv.pia.backend.model.*;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.model.response.SearchResultResponse;
import com.kiv.pia.backend.repository.RoleRepository;
import com.kiv.pia.backend.repository.UserRepository;
import com.kiv.pia.backend.security.services.UserDetailsImpl;
import com.kiv.pia.backend.service.IFriendshipService;
import com.kiv.pia.backend.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private static Logger log = LoggerFactory.getLogger(UserController.class);

    private UserMapper userMapper = new UserMapper();

    @Autowired
    private IUserService userService;

    @Autowired
    private IFriendshipService friendshipService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id")UUID id){
        return userService.findById(id);
    }

    @GetMapping("/findAll")
    public List<User> findAll(){
        return (List<User>) userService.findAll();
    }

    @GetMapping("/findAll/{name}")
    public ResponseEntity<?> findAll(@PathVariable String name){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();
        User user = userService.findById(userDetails.getId());
        if(user == null){
            return ResponseEntity
                    .badRequest()
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

        return ResponseEntity.ok().body(searchResult);
    }
}
