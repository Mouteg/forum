package ru.bntu.forum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bntu.forum.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
