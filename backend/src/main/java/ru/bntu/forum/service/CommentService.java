package ru.bntu.forum.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.bntu.forum.model.Comment;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.User;
import ru.bntu.forum.repository.CommentRepository;
import ru.bntu.forum.repository.PostRepository;
import ru.bntu.forum.repository.UserRepository;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PostRepository postRepository;

    public UUID createComment(UUID userId, UUID postId, UUID catalogId, String content) {
        User user = userRepository.findById(userId).get();
        Post post = postRepository.findById(postId).get();

        Comment comment = new Comment(userId, user, content);   
        commentRepository.save(comment);
        
        post.getComments().add(comment);
        postRepository.saveAndFlush(post);
        
        return comment.getId();
    }

    public void deleteComment(UUID id) {
        commentRepository.deleteById(id);
    }
}
