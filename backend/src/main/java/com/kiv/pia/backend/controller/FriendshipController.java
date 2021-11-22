package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.Post;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.request.NewFriendshipBody;
import com.kiv.pia.backend.model.request.PostCreateBody;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.security.services.UserDetailsImpl;
import com.kiv.pia.backend.service.IFriendshipService;
import com.kiv.pia.backend.service.IPostService;
import com.kiv.pia.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/friendship")
@CrossOrigin
public class FriendshipController {

    @Autowired
    private IFriendshipService friendshipService;

    @Autowired
    private IUserService userService;

    @PostMapping("/newFriendship")
    public ResponseEntity<?> createNewFriendship(@Valid @RequestBody NewFriendshipBody body){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        Optional<User> user = userService.findById(userDetails.getId());
        Optional<User> endUser = userService.findById(body.getEndId());
        if(user.isEmpty() || endUser.isEmpty()){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }

        Friendship newFriendship = friendshipService.saveOrUpdate(new Friendship(user.get(), endUser.get(), body.getFriendshipType()));
        if(newFriendship != null){
            return ResponseEntity.ok().body(newFriendship);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
