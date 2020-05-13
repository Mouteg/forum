package ru.bntu.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bntu.forum.dto.CatalogDto;
import ru.bntu.forum.model.Catalog;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.service.CatalogService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/forum", produces = MediaType.APPLICATION_JSON_VALUE)
public class CatalogController {
    @Autowired
    CatalogService catalogService;

    @PostMapping("/create")
    public void createCatalog(@RequestBody CatalogDto dto){
        catalogService.createCatalog(dto.title, dto.slug);
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteCatalog(@RequestBody CatalogDto dto){
        try{
            catalogService.deleteCatalog(dto.id);
        }catch (Throwable e){
            return new ResponseEntity<String>("Error during deletion", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/")
    public List<Catalog> getAllCatalogs(){
        return catalogService.getAllCatalogs();
    }

    @GetMapping("/{id}/posts")
    public List<Post> getAllPosts(@PathVariable("id") UUID id, @RequestParam String sorting_method){
        return catalogService.getAllPosts(id, sorting_method);
    }

    @GetMapping("/{id}/pinned")
    public List<Post> getAllPosts(@PathVariable("id") UUID id){
        return catalogService.getAllPosts(id, "date", true);
    }
}
