package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.Friendship;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

public interface IFriendshipService {
    Collection<Friendship> findAll();

    Optional<Friendship> findById(UUID id);

    Friendship saveOrUpdate(Friendship t);

    void deleteById(UUID id);
}
