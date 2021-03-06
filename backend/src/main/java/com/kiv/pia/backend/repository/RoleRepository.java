package com.kiv.pia.backend.repository;

import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.enums.RoleType;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RoleRepository extends CrudRepository<Role, UUID> {

    @Query("SELECT r FROM Role r WHERE r.name = :name")
    Role findByType(@Param("name") RoleType name);
}
