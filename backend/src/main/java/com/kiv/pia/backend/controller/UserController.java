package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public User createUser(@RequestBody User user){
        if(user.getEmail().isBlank() || user.getPassword().isBlank()){
            return null;
        }

        return userService.createUser(user);
    }

    @GetMapping("getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
