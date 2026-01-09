package com.expensetracker.ExpenceTrackerBackend.service;

import com.expensetracker.ExpenceTrackerBackend.dto.AuthenticationRequest;
import com.expensetracker.ExpenceTrackerBackend.dto.AuthenticationResponse;
import com.expensetracker.ExpenceTrackerBackend.dto.RegisterRequest;
import com.expensetracker.ExpenceTrackerBackend.model.User;
import com.expensetracker.ExpenceTrackerBackend.repository.UserRepository;
import com.expensetracker.ExpenceTrackerBackend.security.JwtUtil;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;

    public AuthenticationService(UserRepository repository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(RegisterRequest request) {
        if (repository.existsByEmail(request.getEmail())) {
             throw new RuntimeException("Email already exists");
        }

        var user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setProvider(User.Provider.LOCAL);

        repository.save(user);
        
        // Load details as UserDetails to generate token
        var userDetails = new org.springframework.security.core.userdetails.User(
            user.getEmail(), 
            user.getPassword(), 
            new java.util.ArrayList<>()
        );
        
        var jwtToken = jwtUtil.generateToken(userDetails);
        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow();
                
        // Load details as UserDetails to generate token
        var userDetails = new org.springframework.security.core.userdetails.User(
            user.getEmail(), 
            user.getPassword(), 
            new java.util.ArrayList<>()
        );
        
        var jwtToken = jwtUtil.generateToken(userDetails);
        return new AuthenticationResponse(jwtToken);
    }
}
