package ru.bntu.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.bntu.forum.dto.CommentDto;
import ru.bntu.forum.model.Post;
import ru.bntu.forum.service.CommentService;

import java.util.UUID;

@RestController
@RequestMapping(value = "/api/comment", produces = MediaType.APPLICATION_JSON_VALUE)
public class CommentController {
    @Autowired
    CommentService commentService;

    @PostMapping("/create")
    public ResponseEntity<?> getAllPosts(@RequestBody CommentDto dto){
        try{
            commentService.createPost(dto.userId, dto.postId, dto.catalogId, dto.content);
        }catch (Throwable e){
            return new ResponseEntity<>("Error during creation",HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteComment(@RequestBody UUID id){
        try{
            commentService.deleteComment(id);
        }catch (Throwable e){
            return new ResponseEntity<>("Error during deletion", HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }


}

