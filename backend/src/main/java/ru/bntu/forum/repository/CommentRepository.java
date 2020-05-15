package ru.bntu.forum.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import ru.bntu.forum.model.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
}
