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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ru.bntu.forum.model.UserCookieModel;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
	

	
    @GetMapping("/me")
    public UserCookieModel getMe(HttpServletRequest request) throws UnsupportedEncodingException {
    	
    	Cookie[] cookies = request.getCookies();
    	
    	UserCookieModel userCookieModel = null;
    	
    	if (cookies != null) {
    		 Cookie userCookie = Arrays.stream(cookies).filter(c -> c.getName()
                    .equals("User_COOKIE")).findAny().orElse(null);
    		 if (userCookie != null) {
	    		 ObjectMapper objectMapper = new ObjectMapper();
	
	    		 try {
	    			 userCookieModel = objectMapper.readValue(URLDecoder.decode(userCookie.getValue(), "UTF-8"), UserCookieModel.class);
	    		 } catch (JsonProcessingException e) {
					e.printStackTrace();
	    		 }
    		 }
    	}
    	
    	return userCookieModel;
    }
    
    @GetMapping("/messages")
    public @ResponseBody
    ResponseEntity<List> saveMessage(HttpServletRequest request)
    {
        List greetings = (List) request.getSession().getAttribute("GREETING_MESSAGES");
        if(greetings == null) {
            greetings = new ArrayList<>();
            request.getSession().setAttribute("GREETING_MESSAGES", greetings);
        }
        greetings.add("бибу черемякай");
        return new ResponseEntity<List>(greetings, HttpStatus.OK);
    }
}
