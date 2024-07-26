package com.teamblue.Management_App.controllers;

import java.util.List;

import com.teamblue.Management_App.dtos.BasicUserDto;
import com.teamblue.Management_App.dtos.CredentialsDto;
import com.teamblue.Management_App.dtos.FullUserDto;
import com.teamblue.Management_App.dtos.UserRequestDto;
import com.teamblue.Management_App.entities.Credentials;
import com.teamblue.Management_App.services.UserService;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/users")
@NoArgsConstructor // TODO Remove
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping
    public List<BasicUserDto> getAllUsers(){
    	return userService.getAllUsers();
    }
    
    @PostMapping
    public FullUserDto createUser(@RequestBody UserRequestDto userRequestDto) {
    	return userService.createUser(userRequestDto);
    }

    @PostMapping("/login")
    public ResponseEntity<FullUserDto> login(@RequestBody CredentialsDto credentialsDto) {
        FullUserDto user = userService.login(credentialsDto);
        return ResponseEntity.ok(user);
    }
}
