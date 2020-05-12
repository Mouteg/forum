package ru.bntu.forum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import ru.bntu.forum.model.Catalog;
import ru.bntu.forum.model.User;
import ru.bntu.forum.repository.CatalogRepository;
import ru.bntu.forum.repository.UserRepository;

import java.util.List;
import java.util.UUID;

@Service
public class CatalogService {

    @Autowired
    CatalogRepository catalogRepository;

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
}

