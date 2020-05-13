package ru.bntu.forum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bntu.forum.model.Catalog;
import ru.bntu.forum.model.DateAudit;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.repository.CatalogRepository;
import ru.bntu.forum.repository.PostRepository;

import java.util.Comparator;
import java.util.List;
import java.util.UUID;
import java.util.function.Predicate;
import java.util.stream.Collectors;

@Service
public class CatalogService {

    @Autowired
    CatalogRepository catalogRepository;

    @Autowired
    PostRepository postRepository;

    public void createCatalog(String title, String slug) {
        Catalog catalog = new Catalog(title, slug);
        catalogRepository.save(catalog);
    }

    public Catalog findBySlug(String slug){
        return catalogRepository.findBySlug(slug);
    }

    public void deleteCatalog(UUID id) {
        Catalog catalog = catalogRepository.findById(id).get();
        catalogRepository.delete(catalog);
    }

    public List<Catalog> getAllCatalogs(){
        return catalogRepository.findAll();
    }

    public List<Post> getAllPosts(UUID id, String sorting_method) {
        return getAllPosts(id, sorting_method, false);
    }

    public List<Post> getAllPosts(UUID id, String sorting_method, boolean pinned) {
        List<Post> postsUnsorted = catalogRepository.findById(id).get().getPosts();
        List<Post> posts = postsUnsorted;
        if(postsUnsorted.size() > 0){
            Predicate<Post> isPinned = post-> post.isPinned() == pinned;
            posts = postsUnsorted.stream().filter(isPinned).collect(Collectors.toList());
            switch (sorting_method){
                case "date":{
                    Comparator<Post> byDate = Comparator.comparing(DateAudit::getCreatedAt);
                    posts.sort(byDate);
                    break;
                }
                case "popularity":{
                    Comparator<Post> bySize = Comparator.comparingInt((Post p) -> p.getFavorites().size());
                    posts.sort(bySize);
                    break;
                }
            }
        }
        return posts;
    }
}
