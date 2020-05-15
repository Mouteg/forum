package ru.bntu.forum.dto;

import java.util.List;
import java.util.UUID;

import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.User;

public class UserProfileDto {
	
	 public UserProfileDto(User user, List<Post> postsByUser) {
			this.username = user.getUsername();
			this.email = user.getEmail();
			this.id = user.getId();
			this.role = user.getRole();
			this.posts = postsByUser;
		}

	    public UUID id;

	    public String username;

	    public String email;

	    public String role;

	    public List<Post> posts;
}
