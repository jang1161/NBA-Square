package com.nba.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nba.backend.dto.LoginRequestDto;
import com.nba.backend.entity.User;
import com.nba.backend.service.UserService;
import com.nba.backend.util.JwtUtil;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto dto) {
        User user = userService.getOrCreateUser(dto);
        String token = jwtUtil.createToken(user.getId(), user.getUsername());

        return ResponseEntity.ok(Map.of(
            "token", token,
            "id", user.getId(),
            "username", user.getUsername()
        ));
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
}
