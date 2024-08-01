package com.intellidev.signmein.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/portal")
@RequiredArgsConstructor
public class PortalController {

    @GetMapping("")
    public String getPortal(){
        return "Welcome To Your Portal";
    }

    @GetMapping("/learner")
    public String getCustomerPortal(){
        return "Welcome To The Learner Portal";
    }

    @GetMapping("/admin")
    public String getAdminPortal(){
        return "Welcome To The Admin Portal";
    }
}