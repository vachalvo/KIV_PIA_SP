package com.kiv.pia.backend.service;

import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.enums.FriendshipType;

import java.util.Collection;
import java.util.UUID;

public interface IFriendshipService {
    Collection<Friendship> findAll();

    Collection<Friendship> findAll(UUID sourceId, UUID endId);

    Friendship findById(UUID id);

    Collection<Friendship> findByIdAndType(UUID id, FriendshipType friendshipType);

    Friendship saveOrUpdate(Friendship t);

    void deleteById(UUID id);
}
