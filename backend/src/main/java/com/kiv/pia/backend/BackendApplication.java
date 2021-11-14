package com.kiv.pia.backend;

import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.enums.RoleType;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.UUID;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner{

	@Autowired
	private IService<User, UUID> userService;

	@Autowired
	private IService<Role, UUID> roleService;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if(roleService.findAll().isEmpty()){
			roleService.saveOrUpdate(new Role(RoleType.ROLE_ADMIN.getName()));
			roleService.saveOrUpdate(new Role(RoleType.ROLE_USER.getName()));
		}

		// TODO - add new admin if non admin is saved in postgres
	}

}
