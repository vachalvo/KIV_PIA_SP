package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

public interface IPostService {
    Collection<Post> findAll();

    Optional<Post> findById(UUID id);

    Post saveOrUpdate(Post t);

    void deleteById(UUID id);

    Page<Post> findAllByPage(Pageable paging);
}
