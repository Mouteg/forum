package ru.bntu.forum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.bntu.forum.model.User;
import ru.bntu.forum.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;    

    public boolean existsByUsername(String username){
        return userRepository.existsByUsername(username);
    }

    public boolean existsByEmail(String email){
        return userRepository.existsByEmail(email);
    }

	public User createUser(String username, String email, String passwordHash) {
		User user = new User(username, email, passwordHash);
		
		var roleName = userRepository.count() == 0 ? "Admin" : "User";
		user.setRole(roleName);
		
		userRepository.save(user);
		return user;
	}
}
