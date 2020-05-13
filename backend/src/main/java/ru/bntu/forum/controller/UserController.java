package ru.bntu.forum.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.bntu.forum.dto.UserCookieDto;
import ru.bntu.forum.utils.Tools;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping(value = "/api/user", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {
	

	
    @GetMapping("/me")
    public UserCookieDto getMe(HttpServletRequest request){
    	return Tools.getMe(request);
    }
    

}
