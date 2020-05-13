package ru.bntu.forum.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import ru.bntu.forum.model.Post;

public interface PostRepository extends JpaRepository<Post, UUID> {
    Optional<Post> findBySlug(String slug);
}
