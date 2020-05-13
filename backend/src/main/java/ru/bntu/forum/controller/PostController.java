package ru.bntu.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bntu.forum.dto.PostDto;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.Tag;
import ru.bntu.forum.service.PostService;
import ru.bntu.forum.utils.Tools;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/api/post", produces = MediaType.APPLICATION_JSON_VALUE)
public class PostController {
    @Autowired
    PostService postService;

    @RequestMapping("/{discussionSlug}")
    public Post getPostBySlug(@PathVariable("discussionSlug")String discussionSlug){
        return postService.getSinglePostBySlug(discussionSlug);
    }

    @PostMapping(value = "/create")
    public Post createPost(@RequestBody PostDto dto){
        return postService.createPost(dto.userId, dto.forumId, dto.title, dto.content, dto.tags, dto.pinned);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deletePost(@RequestBody String slug){
        try{
            postService.deletePost(slug);
        }catch (Throwable e){
            return new ResponseEntity<>("Error during deletion", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping(value = "/like/{discussionId}")
    public Post toggleFavorites(HttpServletRequest request, @PathVariable("discussionId") UUID postId){
        UUID id = Tools.getMe(request).id;
        return postService.toggleFavorites(postId, id);
    }

}
