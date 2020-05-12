package ru.bntu.forum.model;

import java.util.Set;
import java.util.UUID;

import lombok.NoArgsConstructor;

@NoArgsConstructor
public class UserCookieModel {

    public UserCookieModel(User user) {
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