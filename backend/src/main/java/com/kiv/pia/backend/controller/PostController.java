package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.Post;
import com.kiv.pia.backend.service.IPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/posts")
@CrossOrigin
public class PostController {

    @Autowired
    private IPostService postService;

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody Post p){
        Post post = postService.saveOrUpdate(p);
        if(post != null){
            return ResponseEntity.ok().body(post);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPost(@PathVariable UUID id){
        Optional<Post> post = postService.findById(id);
        if(post.isEmpty()){
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
