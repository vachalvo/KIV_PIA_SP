package com.kiv.pia.backend.repository;

import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends CrudRepository<User, UUID> {
    @Query("SELECT u FROM User u WHERE u.email=:email")
    Optional<User> findByEmail(@Param("email") String email);

    @Query(value = "SELECT u FROM users u " +
            "INNER JOIN users_roles ur ON u.id = ur.user_id " +
            "INNER JOIN roles r ON r.id = ur.role_id " +
            "WHERE r.name = 'ROLE_ADMIN'",
            nativeQuery = true)
    Collection<User> findAllAdmins();

    @Query("SELECT u from User u" +
            "    LEFT JOIN Friendship fe on :id = fe.endUser.id AND u.id = fe.sourceUser.id" +
            "    LEFT JOIN Friendship fs on :id = fs.sourceUser.id AND u.id = fs.endUser.id" +
            "    WHERE NOT u.id = :id AND lower(u.name) LIKE %:name% AND " +
            "             (fs.friendshipType = 'REQUEST_WAITING'" +
            "          OR (fe.friendshipType = 'REQUEST_WAITING') " +
            "          OR (fe.friendshipType = 'BLOCKED') " +
            "          OR (fe.friendshipType IS NULL AND fs.friendshipType IS NULL))")
    Iterable<User> findByPartName(@Param("name") String name, @Param("id") UUID id);
}
