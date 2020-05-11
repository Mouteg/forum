package ru.bntu.forum.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import ru.bntu.forum.model.User;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Controller
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
//    @GetMapping(value = "/me")
//    public User getMe(){
//
//    }
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
