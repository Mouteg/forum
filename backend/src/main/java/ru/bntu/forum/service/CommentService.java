package ru.bntu.forum.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.bntu.forum.model.Catalog;
import ru.bntu.forum.model.Comment;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.User;
import ru.bntu.forum.repository.CatalogRepository;
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
    @Autowired
    CatalogRepository catalogRepository;

    public void createPost(UUID userId, UUID postId, UUID catalogId, String content) {
        User user = userRepository.findById(userId).get();
        Post post = postRepository.findById(postId).get();
        Catalog catalog = catalogRepository.findById(catalogId).get();

        Comment comment = new Comment(userId, user, postId, post, catalogId, catalog, content);
        commentRepository.save(comment);
    }

    public void deleteComment(UUID id) {
        commentRepository.delete(commentRepository.findById(id).get());
    }
}
