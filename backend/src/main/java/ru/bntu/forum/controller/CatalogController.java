package ru.bntu.forum.controller;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ru.bntu.forum.dto.CatalogDto;
import ru.bntu.forum.dto.CreateActionDto;
import ru.bntu.forum.dto.DeleteActionDto;
import ru.bntu.forum.model.Catalog;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.service.CatalogService;
import ru.bntu.forum.utils.Tools;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/api/forum", produces = MediaType.APPLICATION_JSON_VALUE)
public class CatalogController {
    @Autowired
    CatalogService catalogService;

    @PostMapping("/create")
    public CreateActionDto createCatalog(@RequestBody CatalogDto dto,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws IOException {
      if(Tools.isNotAdmin(request, response)){
        return null;
      }
    	CreateActionDto createDto = new CreateActionDto();
        try{
        	catalogService.createCatalog(dto.title, dto.slug);
            createDto.created = true;
        }catch (Throwable e){
        	e.printStackTrace();
        }
        return createDto;
    }

    @PostMapping("/delete")
    public DeleteActionDto deleteCatalog(@RequestBody CatalogDto dto,
                                         HttpServletRequest request,
                                         HttpServletResponse response) throws IOException {
      if(Tools.isNotAdmin(request, response)){
        return null;
      }
    	DeleteActionDto deleteDto = new DeleteActionDto();
        try{
            catalogService.deleteCatalog(dto.id);
            deleteDto.deleted = true;
        }catch (Throwable e){
        	e.printStackTrace();
        }
        return deleteDto;
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
