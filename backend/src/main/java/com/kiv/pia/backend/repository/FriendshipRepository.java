package com.kiv.pia.backend.repository;

import com.kiv.pia.backend.model.Friendship;
import com.kiv.pia.backend.model.Role;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.UUID;

public interface FriendshipRepository extends CrudRepository<Friendship, UUID> {
    @Query("SELECT r FROM Friendship r WHERE r.sourceUser = :source_user_id")
    Iterable<Friendship> findBySource(@Param("source_user_id") UUID source_user_id);
}
