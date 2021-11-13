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
}
