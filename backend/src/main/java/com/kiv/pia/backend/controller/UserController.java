package com.kiv.pia.backend.controller;

import com.kiv.pia.backend.model.User;
import com.kiv.pia.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public String add(@RequestBody User user){
        userService.updateUser(user);

        return "Added successfully!";
    }

    @GetMapping("getAll")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }
}
