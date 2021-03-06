package ru.bntu.forum.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ru.bntu.forum.dto.UserProfileDto;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.User;
import ru.bntu.forum.repository.PostRepository;
import ru.bntu.forum.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

	public void createUser(String username, String email, String passwordHash) {
		User user = new User(username, email, passwordEncoder.encode(passwordHash));

		var roleName = userRepository.count() == 0 ? "Admin" : "User";
		user.setRole(roleName);
		System.out.println(user.getId());
		userRepository.saveAndFlush(user);
	}

	public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public UserProfileDto getProfile(String username) {
        User user = userRepository.findByUsername(username);
        List<Post> postsByUser = postRepository.findByUser(user);
        return new UserProfileDto(user, postsByUser);
    }
}
