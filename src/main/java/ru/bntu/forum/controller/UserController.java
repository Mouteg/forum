package ru.bntu.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import ru.bntu.forum.model.Tag;
import ru.bntu.forum.model.User;
import ru.bntu.forum.service.PostService;
import ru.bntu.forum.service.UserService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
	

	
    @GetMapping("/me")
    public User getMe(HttpServletRequest request) {
    	return (User) request.getSession().getAttribute("User");
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
