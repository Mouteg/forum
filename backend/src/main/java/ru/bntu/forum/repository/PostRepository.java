package ru.bntu.forum.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.User;
@Repository
public interface PostRepository extends JpaRepository<Post, UUID> {
    Optional<Post> findBySlug(String slug);
    List<Post> findByUser(User user);
}
