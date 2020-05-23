package ru.bntu.forum.utils;

import java.io.IOException;
import java.util.Arrays;
import java.util.Base64;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import ru.bntu.forum.dto.UserCookieDto;

public class Tools {
    public static String generateSlug(String title){
        UUID id = UUID.randomUUID();
        return title.replaceAll("[^a-z0-9]gi", "").toLowerCase() + "_" + id.toString().replaceAll("-", "");
    }

    public static UserCookieDto getMe(HttpServletRequest request){
        Cookie[] cookies = request.getCookies();

        UserCookieDto userCookieDto = null;

        if (cookies != null) {
            Cookie userCookie = Arrays.stream(cookies).filter(c -> c.getName()
                    .equals("User_COOKIE")).findAny().orElse(null);
            if (userCookie != null) {
                ObjectMapper objectMapper = new ObjectMapper();

                try {
                  byte[] decodedBytes = Base64.getDecoder().decode(userCookie.getValue());
                  String json = new String(decodedBytes);
                  userCookieDto = objectMapper.readValue(json, UserCookieDto.class);
                } catch (JsonProcessingException e) {
                    e.printStackTrace();
                }
            }
        }
        return userCookieDto;
    }

    public static boolean isNotAdmin(HttpServletRequest request, HttpServletResponse response) throws IOException {
      if(getMe(request).role.equals("Admin")){
        return false;
      }
      response.sendError(403);
      return true;
    }
}
