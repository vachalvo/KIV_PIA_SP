package com.kiv.pia.backend;

import com.kiv.pia.backend.helpers.PasswordGenerator;
import com.kiv.pia.backend.model.Role;
import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.model.enums.GenderType;
import com.kiv.pia.backend.model.enums.RoleType;
import com.kiv.pia.backend.service.IRoleService;
import com.kiv.pia.backend.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;


@SpringBootApplication
public class BackendApplication implements CommandLineRunner{

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private IUserService userService;

	@Autowired
	private IRoleService roleService;

	private static Logger log = LoggerFactory.getLogger(BackendApplication.class);


	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) {
		PasswordGenerator passwordGenerator = new PasswordGenerator();
		if(roleService.findAll().isEmpty()){
			roleService.saveOrUpdate(new Role(RoleType.ROLE_ADMIN));
			roleService.saveOrUpdate(new Role(RoleType.ROLE_USER));
		}

		if(userService.findAll().isEmpty()){
			Collection<Role> collection = roleService.findAll();
			// TODO log this user to log for getting credentials
			String password = passwordGenerator.generateRandomPassword(8);
			log.debug("Email: " + "admin@admin.com");
			log.debug("Password: " + password);
			User default_admin_account = new User("admin@admin.com", encoder.encode(password), "Admin Admin", GenderType.MALE);

			Set<Role> roles = new HashSet<>(collection);
			default_admin_account.setRoles(roles);

			userService.saveOrUpdate(default_admin_account);
		}
	}

}
