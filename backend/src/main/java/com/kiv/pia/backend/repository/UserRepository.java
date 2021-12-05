package com.kiv.pia.backend.repository;

import com.kiv.pia.backend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {
    @Query("SELECT u FROM User u WHERE u.email=:email")
    User findByEmail(@Param("email") String email);

    Boolean existsByEmail(String email);

    @Query("SELECT u from User u" +
            "    LEFT JOIN Friendship fe on :id = fe.endUser.id AND u.id = fe.sourceUser.id" +
            "    LEFT JOIN Friendship fs on :id = fs.sourceUser.id AND u.id = fs.endUser.id" +
            "    WHERE NOT u.id = :id AND u.name LIKE %:name% AND " +
            "             (fs.friendshipType = 'REQUEST_WAITING'" +
            "          OR (fe.friendshipType = 'REQUEST_WAITING') " +
            "          OR (fe.friendshipType = 'BLOCKED') " +
            "          OR (fe.friendshipType IS NULL AND fs.friendshipType IS NULL))")
    Iterable<User> findByPartName(@Param("name") String name, @Param("id") UUID id);
}
