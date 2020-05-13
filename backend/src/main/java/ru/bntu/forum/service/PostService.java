package ru.bntu.forum.service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.bntu.forum.model.Catalog;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.Tag;
import ru.bntu.forum.model.User;
import ru.bntu.forum.repository.CatalogRepository;
import ru.bntu.forum.repository.PostRepository;
import ru.bntu.forum.repository.UserRepository;
import ru.bntu.forum.utils.Tools;

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

    public void deletePost(String slug){
        postRepository.delete(postRepository.findBySlug(slug).get());
    }

    public Post toggleFavorites(UUID postId, UUID id) {
        Post post = postRepository.findById(postId).get();
        User user = userRepository.findById(id).get();
        Set<User> favorites = post.getFavorites();
        if(favorites.contains(user)){
            favorites.remove(user);
        }else{
            favorites.add(user);
        };
        post.setFavorites(favorites);
        return post;
    }

//    public Post toggleFavorites(UUID postId) {
//    }
}
