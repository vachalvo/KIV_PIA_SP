package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.enums.FriendshipState;
import com.kiv.pia.backend.model.enums.FriendshipType;
import com.kiv.pia.backend.model.request.FriendshipCollaborationBody;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.security.services.UserDetailsImpl;
import com.kiv.pia.backend.service.IFriendshipService;
import com.kiv.pia.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/friendship")
@CrossOrigin
public class FriendshipController {

    @Autowired
    private IFriendshipService friendshipService;

    @Autowired
    private IUserService userService;

    @GetMapping("/findAll/{type}")
    public ResponseEntity<?> findAll(@PathVariable("type") FriendshipType type){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user = userService.findById(userDetails.getId());
        if(user == null){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }

        return ResponseEntity
                .ok()
                .body(friendshipService.findByIdAndType(user.getId(), type).toArray());
    }

    @PostMapping("/new/{endId}")
    public ResponseEntity<?> newFriendship(@PathVariable("endId") UUID endId){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user = userService.findById(userDetails.getId());
        User endUser = userService.findById(endId);
        if(user == null || endUser == null){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }
        Collection<Friendship> friendships = friendshipService.findAll(user.getId(), endUser.getId());
        if(!friendships.isEmpty()) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Request already send!"));
        }

        Friendship newFriendship = friendshipService.saveOrUpdate(new Friendship(user, endUser, FriendshipType.REQUEST_WAITING));
        if(newFriendship != null){
            return ResponseEntity.ok().body(newFriendship);
        }

        return ResponseEntity.badRequest().body(new ErrorResponse("Unknow error! Try it again."));
    }

    @PostMapping("/interact")
    public ResponseEntity<?> interact(@Valid @RequestBody FriendshipCollaborationBody body){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        // TODO - add validation on userDetails
        switch (body.getFriendshipState()){
            case ACCEPTED:
                return accept(body);
            case BLOCKED:
                return block(body);
        }

        return ResponseEntity.badRequest().body(new ErrorResponse("Unknown friendship state!"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") UUID id){
        Friendship friendship = friendshipService.findById(id);
        if(friendship == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Friendship not found!"));
        }

        friendshipService.deleteById(friendship.getId());

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private ResponseEntity<?> accept(FriendshipCollaborationBody body){
        Friendship friendship = friendshipService.findById(body.getFriendshipId());

        if(friendship == null){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Friendship not found!"));
        }
        if(body.getFriendshipState() != FriendshipState.ACCEPTED){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Wrong friendship type!"));
        }
        if(friendship.getFriendshipType() != FriendshipType.REQUEST_WAITING){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Cannot unblock user in actual state!"));
        }

        friendship.setFriendshipType(FriendshipType.FRIENDS);
        friendship = friendshipService.saveOrUpdate(friendship);

        if(friendship == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Unknown error!"));
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private ResponseEntity<?> block(FriendshipCollaborationBody body){
        Friendship friendship = friendshipService.findById(body.getFriendshipId());

        if(friendship == null){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Friendship not found!"));
        }
        if(body.getFriendshipState() != FriendshipState.BLOCKED){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Wrong friendship type!"));
        }
        if(friendship.getFriendshipType() != FriendshipType.REQUEST_WAITING){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Cannot block user in actual state!"));
        }

        friendship.setFriendshipType(FriendshipType.BLOCKED);
        friendship = friendshipService.saveOrUpdate(friendship);

        if(friendship == null) {
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Unknown error!"));
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}