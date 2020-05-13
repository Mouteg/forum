package ru.bntu.forum.dto;

import java.util.UUID;

public class CommentDto {
    public UUID postId;

    public UUID userId;

    public UUID catalogId;

    public String content;
}
