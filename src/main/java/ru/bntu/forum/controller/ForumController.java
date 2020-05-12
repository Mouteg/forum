package ru.bntu.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bntu.forum.dto.CatalogDto;
import ru.bntu.forum.model.Catalog;
import ru.bntu.forum.service.CatalogService;

import java.util.List;

@RestController
@RequestMapping(value = "/api/forum", produces = MediaType.APPLICATION_JSON_VALUE)
public class ForumController {
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
}
