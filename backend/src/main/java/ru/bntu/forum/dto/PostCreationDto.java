package ru.bntu.forum.dto;

import ru.bntu.forum.model.Tag;

import java.util.List;
import java.util.UUID;

public class PostCreationDto {
    public UUID userId;
    public UUID forumId;
    public String title;
    public String content;
    public List<Tag> tags;
    public boolean pinned;
}
