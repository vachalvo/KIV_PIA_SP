package com.kiv.pia.backend.service.impl;

import com.kiv.pia.backend.model.Friendship;
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
    public Optional<Friendship> findById(UUID id) {
        return friendshipRepository.findById(id);
    }

    @Override
    public Friendship saveOrUpdate(Friendship t) {
        return friendshipRepository.save(t);
    }

    @Override
    public void deleteById(UUID id) {
        friendshipRepository.deleteById(id);
    }

    public Collection<Friendship> findBySource(UUID sourceId){
        return (Collection<Friendship>) friendshipRepository.findBySource(sourceId);
    }
}

