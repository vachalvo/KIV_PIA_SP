package com.kiv.pia.backend.service.impl;

import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.enums.FriendshipType;
import com.kiv.pia.backend.repository.FriendshipRepository;
import com.kiv.pia.backend.service.IFriendshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Service
public class FriendshipServiceImpl implements IFriendshipService {

    @Autowired
    private FriendshipRepository friendshipRepository;

    @Override
    public Collection<Friendship> findAll() {
        return (Collection<Friendship>) friendshipRepository.findAll();
    }

    @Override
    public Collection<Friendship> findAll(UUID sourceId, UUID endId) {
        return (Collection<Friendship>) friendshipRepository.findByBoth(sourceId, endId);
    }

    @Override
    public Friendship findById(UUID id) {
        Optional<Friendship> friendship = friendshipRepository.findById(id);
        return friendship.orElse(null);
    }

    @Override
    public Collection<Friendship> findByIdAndType(UUID id, FriendshipType friendshipType, boolean bySource) {
        if(bySource){
            return (Collection<Friendship>) friendshipRepository.findBySourceAndType(id, friendshipType);
        }

        return (Collection<Friendship>) friendshipRepository.findByEndAndType(id, friendshipType);
    }

    @Override
    public Collection<Friendship> findAllFriends(UUID id) {
        return (Collection<Friendship>) friendshipRepository.findAllFriends(id);
    }

    @Override
    public Friendship saveOrUpdate(Friendship t) {
        return friendshipRepository.save(t);
    }

    @Override
    public void deleteById(UUID id) {
        friendshipRepository.deleteById(id);
    }
}

