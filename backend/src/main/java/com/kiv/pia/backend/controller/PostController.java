package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.Post;
import com.kiv.pia.backend.service.IPostService;
import com.kiv.pia.backend.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/posts")
@CrossOrigin
public class PostController {

    @Autowired
    private IService<Post, UUID> postService;

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
    public ResponseEntity<List<Post>> findAll(){
        List<Post> posts = (List<Post>) postService.findAll();
        return ResponseEntity.ok().body(posts);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable UUID id) {
        postService.deleteById(id);
    }
}
