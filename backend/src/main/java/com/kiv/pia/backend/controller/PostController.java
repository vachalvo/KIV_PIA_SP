package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.Post;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.enums.RoleType;
import com.kiv.pia.backend.model.request.PostCreateBody;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.security.services.UserDetailsImpl;
import com.kiv.pia.backend.service.IFriendshipService;
import com.kiv.pia.backend.service.IPostService;
import com.kiv.pia.backend.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
@CrossOrigin
public class PostController {

    @Autowired
    private IPostService postService;

    @Autowired
    private IUserService userService;

    @Autowired
    private IFriendshipService friendshipService;

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

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@Valid @RequestBody PostCreateBody p){
        User user = getCurrentUser();

        if(user == null){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }

        if(p.getAnnouncement() && !userService.hasRole(user, RoleType.ROLE_ADMIN)){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User without admin permission cannot create annoucements!"));
        }

        Post post = postService.saveOrUpdate(new Post(p.getHeader(), p.getContent(), LocalDateTime.now(), user, p.getAnnouncement()));
        return ResponseEntity.ok().body(post);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable UUID id, @Valid @RequestBody PostCreateBody p){
        Optional<Post> originalPost = postService.findById(id);
        if(originalPost.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        originalPost.get().setContent(p.getContent());
        originalPost.get().setHeader(p.getHeader());
        Post post = postService.saveOrUpdate(originalPost.get());

        if(post != null){
            return ResponseEntity.ok().body(post);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable UUID id){
        Optional<Post> post = postService.findById(id);

        if(post.isPresent()){
            return ResponseEntity.ok().body(post);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/findAll")
    public ResponseEntity<?> findAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size,
                                                       @RequestParam(defaultValue = "dateTimeOfPublished") String sortBy){
        User user = getCurrentUser();
        if(user == null){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }
        Page<Post> postsInPage = postService.findAllByFriends(user.getId(), PageRequest.of(page, size, Sort.by(sortBy).descending()));

        return ResponseEntity.ok().body(createPagePostsResponseBody(postsInPage));
    }

    @GetMapping("/findAllByUser")
    public ResponseEntity<?> findAllByUser(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size,
                                                       @RequestParam(defaultValue = "dateTimeOfPublished") String sortBy){
        User user = getCurrentUser();
        if(user == null){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }
        Page<Post> usersPosts = postService.findAllByUser(user.getId(), PageRequest.of(page, size, Sort.by(sortBy).descending()));

        return ResponseEntity.ok().body(createPagePostsResponseBody(usersPosts));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        postService.deleteById(id);
    }
}
