package ru.bntu.forum.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import ru.bntu.forum.dto.CommentDto;
import ru.bntu.forum.dto.CreateActionDto;
import ru.bntu.forum.dto.DeleteActionDto;
import ru.bntu.forum.service.CommentService;

@RestController
@RequestMapping(value = "/api/comment", produces = MediaType.APPLICATION_JSON_VALUE)
public class CommentController {
    @Autowired
    CommentService commentService;

    @PostMapping("/create")
    public CreateActionDto createComment(@RequestBody CommentDto dto){
        CreateActionDto createActionDto = new CreateActionDto();
        try{
            UUID id = commentService.createComment(dto.user_id, dto.discussion_id, dto.forum_id, dto.content);
            createActionDto.id = id;
        }catch (Throwable e){
            e.printStackTrace();
        }
        return createActionDto;
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

