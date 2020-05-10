package ru.bntu.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.service.PostService;

@RestController
@RequestMapping(value = "/api/post", produces = MediaType.APPLICATION_JSON_VALUE)
public class PostController {
    @Autowired
    PostService postService;

    @RequestMapping("/{discussionSlug}")
    public Post getPostBySlug(@PathVariable("discussionSlug")String discussionSlug){
        return postService.getSinglePostBySlug(discussionSlug);
    }
}
