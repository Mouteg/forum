package ru.bntu.forum.dto;

import java.util.UUID;

public class CommentDto {
	
    public UUID discussion_id;

    public UUID user_id;

    public UUID forum_id;

    public String content;
}
