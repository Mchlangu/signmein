package com.intellidev.signmein.service;

import com.intellidev.signmein.dto.LoginDto;
import com.intellidev.signmein.dto.RegisterDto;

public interface AuthService {
    String login(LoginDto loginDto);
    String register(RegisterDto registerDto);
}
