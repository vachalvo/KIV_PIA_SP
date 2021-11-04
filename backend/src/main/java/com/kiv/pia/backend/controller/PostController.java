package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.Post;
import com.kiv.pia.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/posts")
@CrossOrigin
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<?> createPost(@RequestBody Post p){
        Post post = postService.create(p);
        if(post != null){
            return ResponseEntity.ok().body(post);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<?> getPost(@PathVariable UUID id){
        Post post = postService.findById(id);
        if(post != null){
            return ResponseEntity.ok().body(post);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<Post>> findAll(){
        List<Post> posts = postService.findAll();
        return ResponseEntity.ok().body(posts);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable UUID id) {
        postService.deleteById(id);
    }
}
