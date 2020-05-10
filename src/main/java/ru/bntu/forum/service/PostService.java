package ru.bntu.forum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.repository.PostRepository;

import java.util.Optional;
import java.util.UUID;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    public Post getSinglePostBySlug(String slug){
        return postRepository.findBySlug(slug).orElse(null);
    }

    public Post getSinglePostById(UUID id){
        return postRepository.findById(id).orElse(null);
    }
}
