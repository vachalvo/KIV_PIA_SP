package com.kiv.pia.backend;

import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.RoleType;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.service.IRoleService;
import com.kiv.pia.backend.service.IUserService;
import com.kiv.pia.backend.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class BackendApplication implements CommandLineRunner{

	@Autowired
	private IUserService userService;

	@Autowired
	private IRoleService roleService;

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		roleService.create(new Role(RoleType.ROLE_ADMIN.getName()));
		roleService.create(new Role(RoleType.ROLE_USER.getName()));
	}

}
