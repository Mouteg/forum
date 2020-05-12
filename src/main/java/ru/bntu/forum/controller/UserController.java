package ru.bntu.forum.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ru.bntu.forum.dto.UserCookieDto;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
	

	
    @GetMapping("/me")
    public UserCookieDto getMe(HttpServletRequest request) throws UnsupportedEncodingException {
    	
    	Cookie[] cookies = request.getCookies();
    	
    	UserCookieDto userCookieDto = null;
    	
    	if (cookies != null) {
    		 Cookie userCookie = Arrays.stream(cookies).filter(c -> c.getName()
                    .equals("User_COOKIE")).findAny().orElse(null);
    		 if (userCookie != null) {
	    		 ObjectMapper objectMapper = new ObjectMapper();
	
	    		 try {
	    			 userCookieDto = objectMapper.readValue(URLDecoder.decode(userCookie.getValue(), "UTF-8"), UserCookieDto.class);
	    		 } catch (JsonProcessingException e) {
					e.printStackTrace();
	    		 }
    		 }
    	}
    	
    	return userCookieDto;
    }
    

}
