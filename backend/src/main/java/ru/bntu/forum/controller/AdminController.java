package ru.bntu.forum.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.bntu.forum.dto.AdminInfoDto;
import ru.bntu.forum.service.AdminService;
import ru.bntu.forum.utils.Tools;

@RestController
@RequestMapping(value = "/api/admin", produces = MediaType.APPLICATION_JSON_VALUE)
public class AdminController {

    @Autowired
    AdminService adminService;

    @GetMapping("/")
    public AdminInfoDto getAdminInfo(HttpServletRequest request, HttpServletResponse response) throws IOException {
      if(Tools.isNotAdmin(request, response)){
        return null;
      }
      return adminService.getInfo();
    }
}

