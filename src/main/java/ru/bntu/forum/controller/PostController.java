package ru.bntu.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.model.Tag;
import ru.bntu.forum.service.PostService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
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
    public Post createPost(@RequestParam UUID userId,
                           @RequestParam UUID forumId,
                           @RequestParam String title,
                           @RequestParam String content,
                           @RequestParam List<Tag> tags,
                           @RequestParam boolean pinned){
        return postService.createPost(userId, forumId, title, content, tags, pinned);
    }

//    @PutMapping(value = "/like/{discussionId}")
//    public Post toggleFavorites(HttpServletRequest request, HttpServletResponse response, @PathVariable("discussionId") UUID postId){
//        HttpSession session = request.getSession(false);
//        session.getAttribute("userId");
//        return postService.toggleFavorites(postId);
//    }
}
