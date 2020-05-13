package ru.bntu.forum.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.bntu.forum.dto.CommentDto;
import ru.bntu.forum.dto.DeleteActionDto;
import ru.bntu.forum.service.CommentService;

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
    public DeleteActionDto deleteComment(@RequestBody UUID id){
    	DeleteActionDto deleteDto = new DeleteActionDto();
        try{
            commentService.deleteComment(id);
            deleteDto.deleted = true;
        }catch (Throwable e){
            e.printStackTrace();//return new ResponseEntity<>("Error during deletion", HttpStatus.BAD_REQUEST);
        }
        return deleteDto;//return new ResponseEntity<>(HttpStatus.OK);
    }


}

