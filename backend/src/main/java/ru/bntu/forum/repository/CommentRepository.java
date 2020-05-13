package ru.bntu.forum.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import ru.bntu.forum.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
}
