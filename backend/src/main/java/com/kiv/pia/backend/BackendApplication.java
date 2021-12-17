package com.kiv.pia.backend;

import com.kiv.pia.backend.helpers.CredentialsGenerator;
import com.kiv.pia.backend.constants.GlobalConst;
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

	private static final Logger log = LoggerFactory.getLogger(BackendApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
	}

	@Override
	public void run(String... args) {
		addRoles();
		addAdminAccount();
	}

	private void addRoles() {
		if(roleService.findAll().isEmpty()){
			roleService.saveOrUpdate(new Role(RoleType.ROLE_ADMIN));
			roleService.saveOrUpdate(new Role(RoleType.ROLE_USER));
		}
	}

	private void addAdminAccount() {
		Collection<User> admins = userService.findAllAdmins();
		if(admins.isEmpty()){
			CredentialsGenerator credentialsGenerator = new CredentialsGenerator();
			String password = credentialsGenerator.generateRandomPassword(GlobalConst.DEFAULT_ADMIN_PASSWORD_LENGHT);
			String email;

			User userDB;
			do {
				email = credentialsGenerator.generateRandomEmail();
				userDB = userService.findByEmail(email);
			} while(userDB != null);

			Collection<Role> collection = roleService.findAll();
			User default_admin_account = new User(email, encoder.encode(password), GlobalConst.DEFAULT_ADMIN_NAME, GenderType.MALE);

			Set<Role> roles = new HashSet<>(collection);
			default_admin_account.setRoles(roles);

			log.info(String.format("Admin account not found. New default admin account created. (Email: %s; Password: %s)", email, password));
			userService.saveOrUpdate(default_admin_account);
		}
	}
}
