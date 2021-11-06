package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.Post;

import java.util.List;
import java.util.UUID;

public interface IPostService {
    Post create(Post post);
    Post findById(UUID postId);
    List<Post> findAll();
    void deleteById(UUID postId);
}
