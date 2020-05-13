package ru.bntu.forum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bntu.forum.model.Comment;

import java.util.UUID;

public interface CommentRepository extends JpaRepository<Comment, UUID> {
}
