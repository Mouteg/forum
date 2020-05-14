package ru.bntu.forum.controller;

import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.bntu.forum.dto.CreateActionDto;
import ru.bntu.forum.dto.DeleteActionDto;
import ru.bntu.forum.dto.PostDto;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.service.PostService;
import ru.bntu.forum.utils.Tools;

@RestController
@RequestMapping(value = "/api/post", produces = MediaType.APPLICATION_JSON_VALUE)
public class PostController {
    @Autowired
    PostService postService;

    @RequestMapping("/{discussionSlug}")
    public Post getPostBySlug(@PathVariable("discussionSlug") String discussionSlug){
        return postService.getSinglePostBySlug(discussionSlug);
    }

    @PostMapping(value = "/create")
    public CreateActionDto createPost(@RequestBody PostDto dto){
    	CreateActionDto createDto = new CreateActionDto();
        try{
        	String slug = postService.createPost(dto.userId, dto.forumId, dto.title, dto.content, dto.tags, dto.pinned);
            createDto.created = true;
            createDto.slug = slug;
        }catch (Throwable e){
        	e.printStackTrace();//return new ResponseEntity<>("Error during deletion", HttpStatus.BAD_REQUEST);
        }
        //return new ResponseEntity<>(HttpStatus.OK);
        return createDto;
    }

    @DeleteMapping("/delete")
    public DeleteActionDto deletePost(@RequestBody String slug, HttpServletResponse response){
    	DeleteActionDto deleteDto = new DeleteActionDto();
        try{
            postService.deletePost(slug);
            deleteDto.deleted = true;
        }catch (Throwable e){
        	e.printStackTrace();//return new ResponseEntity<>("Error during deletion", HttpStatus.BAD_REQUEST);
        }
        //return new ResponseEntity<>(HttpStatus.OK);
        return deleteDto;
    }

    @GetMapping(value = "/like/{discussionId}")
    public Post toggleFavorites(HttpServletRequest request, @PathVariable("discussionId") UUID postId){
        UUID id = Tools.getMe(request).id;
        return postService.toggleFavorites(postId, id);
    }

}
