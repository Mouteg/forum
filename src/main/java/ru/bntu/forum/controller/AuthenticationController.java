package ru.bntu.forum.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Arrays;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ru.bntu.forum.model.UserCookieModel;
import ru.bntu.forum.model.UserViewModel;
import ru.bntu.forum.service.SecurityService;
import ru.bntu.forum.service.UserService;

@RestController
@RequestMapping(value = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    UserService userService;

    @Autowired
    SecurityService securityService;

    @PostMapping("/register")
    public @ResponseBody
    ResponseEntity<?> RegisterUser(HttpServletRequest request,
            @RequestBody UserViewModel userModel) {
        userService.createUser(userModel.username, userModel.email, userModel.passwordHash);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public @ResponseBody ResponseEntity<String> login(
    			@RequestBody UserViewModel userModel,
                HttpServletRequest request,
                HttpServletResponse response) throws JsonProcessingException, UnsupportedEncodingException {
        try{
        	Cookie[] cookies = request.getCookies();
            Cookie userCookie;
            
            if (cookies != null) {
            	userCookie = Arrays.stream(request.getCookies()).filter(c -> c.getName()
                    .equals("User_COOKIE")).findAny().orElse(null);
            }
            else {
            	userCookie = null;
            }

            // if we don't have the user already in session, check our cookie MY_SESSION_COOKIE
            if (userCookie == null) {
                securityService.login(userModel.username, userModel.passwordHash);
                UserCookieModel userCookieModel = new UserCookieModel(userService.findByUsername(userModel.username));
       		 
       		 	ObjectMapper objectMapper = new ObjectMapper();
                String json = objectMapper.writeValueAsString(userCookieModel);
                
                System.out.println(json);
                
                userCookie = new Cookie("User_COOKIE", URLEncoder.encode(json, "UTF-8"));
                
            	userCookie.setPath("/");
//            	userCookie.setMaxAge(86400); // valid for one day, choose your value
                response.addCookie(userCookie);
                
                System.out.print("Created login cookie");
            }
            // if we have our cookie, check it
            else {
            	;//userCookie.setMaxAge();
            }            
            
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
