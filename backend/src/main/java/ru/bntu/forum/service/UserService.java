package ru.bntu.forum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ru.bntu.forum.dto.UserProfileDto;
import ru.bntu.forum.model.User;
import ru.bntu.forum.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

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

		userRepository.save(user);
	}

	public User findByUsername(String username){
        return userRepository.findByUsername(username);
    }

    public UserProfileDto getProfile(String username) {
        User user = userRepository.findByUsername(username);
        /*UserProfileDto dto = new UserProfileDto();
        dto.user = new UserCookieDto(user);*/
        UserProfileDto dto = new UserProfileDto(user);
        /*for(Post p : user.getPosts()){
            dto.commentCount.put(p, p.getComments().size());
        }*/
        return dto;
    }
}
