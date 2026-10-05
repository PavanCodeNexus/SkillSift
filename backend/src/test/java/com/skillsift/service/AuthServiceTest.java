package com.skillsift.service;

import com.skillsift.dto.AuthResponse;
import com.skillsift.dto.LoginRequest;
import com.skillsift.dto.RegisterRequest;
import com.skillsift.exception.ApiException;
import com.skillsift.model.User;
import com.skillsift.repository.UserRepository;
import com.skillsift.security.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private JwtUtil jwtUtil;

    private AuthService authService;

    @BeforeEach
    void setUp() {
        authService = new AuthService(userRepository, passwordEncoder, jwtUtil);
    }

    @Test
    void testRegisterSuccess() {
        RegisterRequest request = new RegisterRequest();
        request.setName("Alice");
        request.setEmail("alice@test.edu");
        request.setPassword("password123");
        request.setEducation("B.Tech");
        request.setCollege("VTU");

        when(userRepository.existsByEmail("alice@test.edu")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("hashedPass");

        User savedUser = new User("Alice", "B.Tech", "VTU", "alice@test.edu", "hashedPass");
        savedUser.setId(1L);
        when(userRepository.save(any(User.class))).thenReturn(savedUser);
        when(jwtUtil.generateToken("alice@test.edu")).thenReturn("mock-jwt-token");

        AuthResponse response = authService.register(request);

        assertNotNull(response);
        assertEquals("mock-jwt-token", response.getToken());
        assertEquals("Alice", response.getName());
        assertEquals("alice@test.edu", response.getEmail());
    }

    @Test
    void testRegisterDuplicateEmailThrowsException() {
        RegisterRequest request = new RegisterRequest();
        request.setEmail("alice@test.edu");

        when(userRepository.existsByEmail("alice@test.edu")).thenReturn(true);

        assertThrows(ApiException.class, () -> authService.register(request));
    }

    @Test
    void testLoginSuccess() {
        LoginRequest request = new LoginRequest();
        request.setEmail("alice@test.edu");
        request.setPassword("password123");

        User user = new User("Alice", "B.Tech", "VTU", "alice@test.edu", "hashedPass");
        user.setId(1L);

        when(userRepository.findByEmail("alice@test.edu")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("password123", "hashedPass")).thenReturn(true);
        when(jwtUtil.generateToken("alice@test.edu")).thenReturn("mock-jwt-token");

        AuthResponse response = authService.login(request);

        assertNotNull(response);
        assertEquals("mock-jwt-token", response.getToken());
        assertEquals("Alice", response.getName());
    }

    @Test
    void testLoginInvalidPasswordThrowsException() {
        LoginRequest request = new LoginRequest();
        request.setEmail("alice@test.edu");
        request.setPassword("wrongPass");

        User user = new User("Alice", "B.Tech", "VTU", "alice@test.edu", "hashedPass");

        when(userRepository.findByEmail("alice@test.edu")).thenReturn(Optional.of(user));
        when(passwordEncoder.matches("wrongPass", "hashedPass")).thenReturn(false);

        assertThrows(ApiException.class, () -> authService.login(request));
    }
}
