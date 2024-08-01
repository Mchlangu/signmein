package com.intellidev.signmein.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/portal")
@RequiredArgsConstructor
public class PortalUserController {

    @GetMapping
    @PreAuthorize("hasRole(''ROLE_USER) or hasRole('ROLE_ADMIN')")
    public String getAllLearners(){
        return "Welcome this is a list of all learners";
    }

    @PostMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String saveLearners(){
        return "You have added a learner";
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String updateLearners(){
        return "Welcome updated a learners";
    }
}