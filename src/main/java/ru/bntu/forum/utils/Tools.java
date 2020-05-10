package ru.bntu.forum.utils;

import java.util.UUID;

public class Tools {
    public String generateSlug(String title){
        UUID id = UUID.randomUUID();
        return title.replaceAll("[^a-z0-9]gi", "").toLowerCase() + "" + id;
    }
}
