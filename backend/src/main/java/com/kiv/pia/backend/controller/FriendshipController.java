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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/friendships")
@CrossOrigin(value = "http://localhost:3000", allowCredentials = "true")
public class FriendshipController {

    private static final Logger log = LoggerFactory.getLogger(FriendshipController.class);

    @Autowired
    private IFriendshipService friendshipService;

    @Autowired
    private IUserService userService;

    @GetMapping("/find-all/friends")
    public ResponseEntity<?> findFriends(){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        log.info("User with id " + userDetails.getId() + " want get friends.");

        User user = userService.findById(userDetails.getId());
        if(user == null){
            log.info("User with id " + userDetails.getId() + " not found.");
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }

        List<Friendship> friends = new ArrayList<>(friendshipService.findAllFriends(user.getId()));
        return ResponseEntity
                .ok()
                .body(friends);
    }

    @GetMapping("/find-all/{type}")
    public ResponseEntity<?> findAll(@PathVariable("type") FriendshipType type, @RequestParam(defaultValue = "true") boolean bySource){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        log.info("User with id " + userDetails.getId() + " want find all by type" + type.name());
        User user = userService.findById(userDetails.getId());
        if(user == null){
            log.info("User with id " + userDetails.getId() + " not found.");
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }

        List<Friendship> friendships;

        if(type == FriendshipType.FRIENDS){
            friendships = new ArrayList<>(friendshipService.findAllFriends(user.getId()));
        }
        else{
            friendships = new ArrayList<>(friendshipService.findByIdAndType(user.getId(), type, bySource));
        }

        return ResponseEntity
                .ok()
                .body(friendships);
    }

    @PostMapping("/{id}")
    public ResponseEntity<?> newFriendship(@PathVariable UUID id){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user = userService.findById(userDetails.getId());
        User endUser = userService.findById(id);

        if(user == null || endUser == null){
            log.info("User with id " + userDetails.getId() + " or " + id + " not found.");
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

    @PutMapping("/interact")
    public ResponseEntity<?> interact(@Valid @RequestBody FriendshipCollaborationBody body){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user = userService.findById(userDetails.getId());
        if(user == null){
            log.info("User with id " + userDetails.getId() + " not found.");
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }

        switch (body.getFriendshipState()){
            case ACCEPTED:
                return accept(body);
            case BLOCKED:
                return block(body);
        }

        log.info("User with id " + userDetails.getId() + " give unknown frienship state");
        return ResponseEntity.badRequest().body(new ErrorResponse("Unknown friendship state!"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") UUID id){
        Friendship friendship = friendshipService.findById(id);
        if(friendship == null) {
            log.info("Friendship with id " + id + " not found.");
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Friendship not found!"));
        }

        friendshipService.deleteById(friendship.getId());
        log.info("Friendship with id " + id.toString() + " was deleted.");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    private ResponseEntity<?> accept(FriendshipCollaborationBody body){
        Friendship friendship = friendshipService.findById(body.getFriendshipId());

        if(friendship == null){
            log.info("Friendship with id " + body.getFriendshipId() + " not found.");
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Friendship not found!"));
        }
        if(body.getFriendshipState() != FriendshipState.ACCEPTED){
            log.info("Request body friendship with id " + body.getFriendshipId() + " has wrong state.");
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Wrong friendship type!"));
        }
        if(friendship.getFriendshipType() != FriendshipType.REQUEST_WAITING){
            log.info("Request body friendship with id " + body.getFriendshipId() + " has wrong state.");
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

        log.info("Friendship with id " + body.getFriendshipId() + " was updated -> " + body.getFriendshipState().toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    private ResponseEntity<?> block(FriendshipCollaborationBody body){
        Friendship friendship = friendshipService.findById(body.getFriendshipId());

        if(friendship == null){
            log.info("Friendship with id " + body.getFriendshipId() + " not found.");
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Friendship not found!"));
        }
        if(body.getFriendshipState() != FriendshipState.BLOCKED){
            log.info("Request body friendship with id " + body.getFriendshipId() + " has wrong state.");
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("Wrong friendship type!"));
        }
        if(friendship.getFriendshipType() != FriendshipType.REQUEST_WAITING){
            log.info("Request body friendship with id " + body.getFriendshipId() + " has wrong state.");
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

        log.info("Friendship with id " + body.getFriendshipId() + " was updated -> " + body.getFriendshipState().toString());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
