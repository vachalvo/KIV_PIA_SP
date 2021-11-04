package com.kiv.pia.backend.service.impl;

import com.kiv.pia.backend.model.Post;
import com.kiv.pia.backend.repository.PostRepository;
import com.kiv.pia.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post create(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Post findById(UUID postId) {
        Optional<Post> post = postRepository.findById(postId);
        return post.orElse(null);
    }

    @Override
    public List<Post> findAll() {
        var it = postRepository.findAll();
        List<Post> posts = new ArrayList<>();
        it.forEach(posts::add);

        return posts;
    }

    @Override
    public void deleteById(UUID postId) {
        postRepository.deleteById(postId);
    }
}
