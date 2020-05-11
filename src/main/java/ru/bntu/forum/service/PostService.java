package ru.bntu.forum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;
import ru.bntu.forum.model.Catalog;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.Tag;
import ru.bntu.forum.model.User;
import ru.bntu.forum.repository.CatalogRepository;
import ru.bntu.forum.repository.PostRepository;
import ru.bntu.forum.repository.UserRepository;
import ru.bntu.forum.utils.Tools;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class PostService {
    @Autowired
    PostRepository postRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CatalogRepository catalogRepository;

    public Post getSinglePostBySlug(String slug){
        return postRepository.findBySlug(slug).orElse(null);
    }

    public Post getSinglePostById(UUID id){
        return postRepository.findById(id).orElse(null);
    }

    public Post createPost(UUID userId,
                           UUID catalogId,
                           String title,
                           String content,
                           List<Tag> tags,
                           boolean pinned){
        String slug = Tools.generateSlug(title);
        User user = userRepository.findById(userId).get();
        Catalog catalog = catalogRepository.findById(catalogId).get();
        Post post = new Post(userId, user, catalogId, catalog, title, content, tags, pinned, slug);
        postRepository.save(post);
        return post;
    }

//    public Post toggleFavorites(UUID postId) {
//    }
}
