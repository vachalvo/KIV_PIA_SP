package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.*;
import com.kiv.pia.backend.repository.RoleRepository;
import com.kiv.pia.backend.repository.UserRepository;
import com.kiv.pia.backend.service.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    private static Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private IUserService userService;

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id")UUID id){
        return userService.findById(id).orElse(null);
    }

    @GetMapping("/findAll")
    public List<User> findAll(){
        return (List<User>) userService.findAll();
    }
}
