package ru.bntu.forum.dto;

import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.User;

import java.util.Dictionary;
import java.util.UUID;

public class UserProfileDto {

    public User user;

    public Dictionary<Post, Integer> commentCount;
}
