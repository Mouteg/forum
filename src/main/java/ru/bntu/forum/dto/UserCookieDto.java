package ru.bntu.forum.dto;

import java.util.Set;
import java.util.UUID;

import lombok.NoArgsConstructor;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.User;

@NoArgsConstructor
public class UserCookieDto {

    public UserCookieDto(User user) {
		this.username = user.getUsername();
		this.email = user.getEmail();
		this.id = user.getId();
		this.role = user.getRole();
		this.posts = user.getPosts();
	}

    public UUID id;

    public String username;

    public String email;

    public String role;

    public Set<Post> posts;

}