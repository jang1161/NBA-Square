package com.nba.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.nba.backend.dto.LoginRequestDto;
import com.nba.backend.entity.User;
import com.nba.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User getOrCreateUser(LoginRequestDto dto) {
        return userRepository.findByExternalId(dto.externalId)
            .orElseGet(() -> { 
                User newUser = new User(dto.getExternalId(), dto.getUsername(), dto.getEmail()); 
                System.out.println("Created new User: " + dto.getUsername());
                return userRepository.save(newUser);
            });
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
