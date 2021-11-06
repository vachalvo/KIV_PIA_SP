package com.kiv.pia.backend.service.impl;

import com.kiv.pia.backend.model.Post;
import com.kiv.pia.backend.repository.PostRepository;
import com.kiv.pia.backend.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PostServiceImpl implements IService<Post, UUID> {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Optional<Post> findById(UUID postId) {
        return postRepository.findById(postId);
    }

    @Override
    public Post saveOrUpdate(Post post) {
        return postRepository.save(post);
    }

    @Override
    public Collection<Post> findAll() {
        return (Collection<Post>) postRepository.findAll();
    }

    @Override
    public void deleteById(UUID postId) {
        postRepository.deleteById(postId);
    }
}
