package com.intellidev.signmein.dto;

import lombok.Data;

@Data
public class RegisterDto {
    private String username;
    private String email;
    private String role;
    private String password;
}
