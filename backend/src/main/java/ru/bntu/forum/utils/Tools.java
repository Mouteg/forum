package ru.bntu.forum.utils;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import ru.bntu.forum.dto.UserCookieDto;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.Arrays;
import java.util.UUID;

public class Tools {
    public static String generateSlug(String title){
        UUID id = UUID.randomUUID();
        return title.replaceAll("[^a-z0-9]gi", "").toLowerCase() + "" + id;
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
                    userCookieDto = objectMapper.readValue(URLDecoder.decode(userCookie.getValue(), "UTF-8"), UserCookieDto.class);
                } catch (JsonProcessingException | UnsupportedEncodingException e) {
                    e.printStackTrace();
                }
            }
        }
        return userCookieDto;
    }
}
