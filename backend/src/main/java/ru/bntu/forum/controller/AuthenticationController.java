package ru.bntu.forum.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ru.bntu.forum.dto.UserCookieDto;
import ru.bntu.forum.dto.UserDto;
import ru.bntu.forum.service.SecurityService;
import ru.bntu.forum.service.UserService;

@RestController
@RequestMapping(value = "/api/auth", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationController {

    @Autowired
    UserService userService;

    @Autowired
    SecurityService securityService;
    
    @Autowired
    private Environment env;

    private static int cookieMaxAge;

    @PostMapping("/register")
    public @ResponseBody
    ResponseEntity<?> RegisterUser(
            @RequestBody UserDto userModel) {
        userService.createUser(userModel.username, userModel.email, userModel.passwordHash);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/login")
    public @ResponseBody ResponseEntity<String> login(
    			@RequestBody UserDto userModel,
                HttpServletRequest request,
                HttpServletResponse response) throws JsonProcessingException, UnsupportedEncodingException {
    	
    	cookieMaxAge = Integer.parseInt(env.getProperty("cookie.max-age"));
    	
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

            if (userCookie == null) {
                securityService.login(userModel.username, userModel.passwordHash);
                UserCookieDto userCookieDto = new UserCookieDto(userService.findByUsername(userModel.username));
       		 
       		 	ObjectMapper objectMapper = new ObjectMapper();
                String json = objectMapper.writeValueAsString(userCookieDto);
                
                userCookie = new Cookie("User_COOKIE", URLEncoder.encode(json, StandardCharsets.UTF_8));
                
            	userCookie.setPath("/");
            	userCookie.setMaxAge(cookieMaxAge);
                response.addCookie(userCookie);
                
                System.out.print("Created login cookie");
            }
            else {
                userCookie = new Cookie(userCookie.getName(), userCookie.getValue());
                userCookie.setPath("/");
            	userCookie.setMaxAge(cookieMaxAge);
                response.addCookie(userCookie);
            }

            
            return new ResponseEntity<>(HttpStatus.OK);
        }catch(UsernameNotFoundException e){
            return new ResponseEntity<>("Bad Credentials", HttpStatus.FORBIDDEN);
        }

    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) throws ServletException {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            Cookie userCookie = Arrays.stream(cookies).filter(c -> c.getName()
                    .equals("User_COOKIE")).findAny().orElse(null);
            if (userCookie != null) {
                request.logout();
                Cookie cookie = new Cookie("User_COOKIE", "");
                cookie.setMaxAge(0);
                cookie.setPath("/");
                response.addCookie(cookie);
            }
        }
        return new ResponseEntity<>(HttpStatus.OK);
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
