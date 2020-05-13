package ru.bntu.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.bntu.forum.dto.AdminInfoDto;
import ru.bntu.forum.service.AdminService;

@RestController
@RequestMapping(value = "/api/admin", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/")
    public AdminInfoDto getAdminInfo(){
        return adminService.getInfo();
    }
}

