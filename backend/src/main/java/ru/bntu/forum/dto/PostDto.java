package ru.bntu.forum.dto;

import java.util.List;
import java.util.UUID;

import ru.bntu.forum.model.Tag;

public class PostDto {
    public UUID userId;
    public UUID forumId;
    public String title;
    public String content;
    public List<Tag> tags;
    public boolean pinned;
}
