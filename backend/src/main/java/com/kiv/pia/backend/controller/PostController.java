package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.Post;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.enums.RoleType;
import com.kiv.pia.backend.model.request.PostCreateBody;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.security.services.UserDetailsImpl;
import com.kiv.pia.backend.service.IPostService;
import com.kiv.pia.backend.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDateTime;
import java.util.*;

@RestController
@RequestMapping("/posts")
@CrossOrigin(value = "http://localhost:3000")
public class PostController {

    @Autowired
    private IPostService postService;

    @Autowired
    private IUserService userService;

    private static final Logger log = LoggerFactory.getLogger(PostController.class);

    private User getCurrentUser() {
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        return userService.findById(userDetails.getId());
    }


    private Map<String, Object> createPagePostsResponseBody(Page<Post> page){
        Map<String, Object> response = new HashMap<>();

        response.put("posts", page.getContent());
        response.put("currentPage", page.getNumber());
        response.put("totalItems", page.getTotalElements());
        response.put("totalPages", page.getTotalPages());

        return response;
    }

    @PostMapping("")
    public ResponseEntity<?> createPost(@Valid @RequestBody PostCreateBody p){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user = getCurrentUser();

        if(user == null){
            log.info("User with id " + userDetails.getId() + " not found.");
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("User does not exist!"));
        }

        if(p.getAnnouncement() && !userService.hasRole(user, RoleType.ROLE_ADMIN)){
            log.info("User with id " + userDetails.getId() + " dont have admin role to create annoucements.");
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("User without admin permission cannot create annoucements!"));
        }

        Post post = postService.saveOrUpdate(new Post(p.getHeader(), p.getContent(), LocalDateTime.now(), user, p.getAnnouncement()));
        log.info("New post with id " + userDetails.getId() + " created. (" + post.toString() + ")");
        return ResponseEntity.ok().body(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable UUID id, @Valid @RequestBody PostCreateBody p){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user = getCurrentUser();
        if(user == null){
            log.info("User with id " + userDetails.getId() + " not found");
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("User does not exist!"));
        }

        Optional<Post> originalPost = postService.findById(id);
        if(originalPost.isEmpty()){
            log.info("Post with id " + id + " not found");
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(originalPost.get().getUser().getId() != user.getId()){
            log.info("User with id " + userDetails.getId() + " is not owner of post with id "+ originalPost.get().getId());
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new ErrorResponse("User do not own this post!"));
        }

        originalPost.get().setContent(p.getContent());
        originalPost.get().setHeader(p.getHeader());
        Post post = postService.saveOrUpdate(originalPost.get());

        if(post != null){
            log.info("Post with id " + post.getId() + " updated. (" + post + ")");

            return ResponseEntity.ok().body(post);
        }

        log.info("Post with id " + id + " not found");
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable UUID id){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user = getCurrentUser();
        if(user == null){
            log.info("User with id " + userDetails.getId() + " not found");
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("User does not exist!"));
        }

        Optional<Post> post = postService.findById(id);

        if(post.isPresent()){
            return ResponseEntity.ok().body(post);
        }

        log.info("Post with id " + id + " not found");
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/find-all")
    public ResponseEntity<?> findAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size,
                                                       @RequestParam(defaultValue = "dateTimeOfPublished") String sortBy){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user = getCurrentUser();
        if(user == null){
            log.info("User with id " + userDetails.getId() + " not found");
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("User does not exist!"));
        }
        Page<Post> postsInPage = postService.findAllByFriends(user.getId(), PageRequest.of(page, size, Sort.by(sortBy).descending()));
        log.info("Post page send to user with id " + userDetails.getId());
        return ResponseEntity.ok().body(createPagePostsResponseBody(postsInPage));
    }

    @GetMapping("/find-all-by-user")
    public ResponseEntity<?> findAllByUser(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size,
                                                       @RequestParam(defaultValue = "dateTimeOfPublished") String sortBy){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        User user = getCurrentUser();
        if(user == null){
            return ResponseEntity
                    .unprocessableEntity()
                    .body(new ErrorResponse("User does not exist!"));
        }
        Page<Post> usersPosts = postService.findAllByUser(user.getId(), PageRequest.of(page, size, Sort.by(sortBy).descending()));
        log.info("Post page with users posts send to user with id " + userDetails.getId());
        return ResponseEntity.ok().body(createPagePostsResponseBody(usersPosts));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        postService.deleteById(id);
    }
}
