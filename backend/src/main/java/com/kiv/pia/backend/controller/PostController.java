package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.Post;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.request.PostCreateBody;
import com.kiv.pia.backend.model.response.ErrorResponse;
import com.kiv.pia.backend.security.services.UserDetailsImpl;
import com.kiv.pia.backend.service.IPostService;
import com.kiv.pia.backend.service.IUserService;
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
@CrossOrigin
public class PostController {

    @Autowired
    private IPostService postService;

    @Autowired
    private IUserService userService;

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@Valid @RequestBody PostCreateBody p){
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
                .getPrincipal();

        Optional<User> user = userService.findById(userDetails.getId());
        if(user.isEmpty()){
            return ResponseEntity
                    .badRequest()
                    .body(new ErrorResponse("User does not exist!"));
        }

        Post post = postService.saveOrUpdate(new Post(p.getHeader(), p.getContent(), LocalDateTime.now(), user.get()));
        if(post != null){
            return ResponseEntity.ok().body(post);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePost(@PathVariable UUID id, @Valid @RequestBody PostCreateBody p){
        Optional<Post> originalPost = postService.findById(id);
        if(originalPost.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        originalPost.get().setContent(p.getContent());
        originalPost.get().setHeader(p.getHeader());
        originalPost.get().setDateTimeOfPublished(LocalDateTime.now());
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
    public ResponseEntity<Map<String, Object>> findAll(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "3") int size,
                                                       @RequestParam(defaultValue = "dateTimeOfPublished") String sortBy){
        Page<Post> postsInPage = postService.findAllByPage(PageRequest.of(page, size, Sort.by(sortBy).ascending()));

        Map<String, Object> response = new HashMap<>();
        response.put("posts", postsInPage.getContent());
        response.put("currentPage", postsInPage.getNumber());
        response.put("totalItems", postsInPage.getTotalElements());
        response.put("totalPages", postsInPage.getTotalPages());

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        postService.deleteById(id);
    }
}
