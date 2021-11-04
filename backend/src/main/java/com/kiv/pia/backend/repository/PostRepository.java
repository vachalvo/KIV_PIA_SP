package com.kiv.pia.backend.repository;

import com.kiv.pia.backend.model.Post;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PostRepository  extends CrudRepository<Post, UUID> {
}
