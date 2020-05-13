package ru.bntu.forum.dto;

import org.springframework.web.bind.annotation.RequestParam;
import ru.bntu.forum.model.Tag;

import java.util.List;
import java.util.UUID;

public class PostDto {
    public UUID userId;
    public UUID forumId;
    public String title;
    public String content;
    public List<Tag> tags;
    public boolean pinned;
}
