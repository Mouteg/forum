package ru.bntu.forum.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import ru.bntu.forum.model.User;

public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
    User findByUsername(String username);
}
