package com.intellidev.signmein.controller;

import com.intellidev.signmein.entity.User;
import com.intellidev.signmein.service.MailService;
import com.intellidev.signmein.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:4200")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private MailService mailService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id) {
        return new ResponseEntity<>(userService.getUserById(id), HttpStatus.OK);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User savedUser = userService.saveUser(user);
        // Send email with login details
        String subject = "Login Details";
        String body = "Username: " + savedUser.getUsername() + "\nPassword: " + savedUser.getPassword();
        mailService.sendEmail(savedUser.getEmail(), subject, body);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
