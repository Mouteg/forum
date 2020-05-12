package ru.bntu.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import ru.bntu.forum.model.User;
import ru.bntu.forum.service.SecurityService;
import ru.bntu.forum.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequestMapping(value = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    UserService userService;

    @Autowired
    SecurityService securityService;

    @PostMapping("/register")
    public @ResponseBody
    ResponseEntity RegisterUser(
            @RequestParam String username,
            @RequestParam String email,
            @RequestParam String passwordHash) {
        userService.createUser(username, email, passwordHash);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/login")
    public @ResponseBody ResponseEntity<String> login(
                @RequestParam String username,
                @RequestParam String passwordHash,
                HttpServletRequest request) {
        try{
            securityService.login(username, passwordHash);
            HttpSession session = request.getSession(true);
            session.setAttribute("User", userService.findByUsername(username));
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(UsernameNotFoundException e){
            return new ResponseEntity<>("Bad Credentials", HttpStatus.FORBIDDEN);
        }

    }


    @PostMapping("/checkUsername")
    public boolean existsUsername(@RequestParam String username){
        return userService.existsByUsername(username);
    }

    @PostMapping("/checkEmail")
    public boolean existsEmail(@RequestParam String email){
        return userService.existsByEmail(email);
    }


}
