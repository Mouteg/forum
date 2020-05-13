package ru.bntu.forum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ru.bntu.forum.dto.AdminInfoDto;
import ru.bntu.forum.repository.CatalogRepository;
import ru.bntu.forum.repository.CommentRepository;
import ru.bntu.forum.repository.PostRepository;
import ru.bntu.forum.repository.UserRepository;

@Service
public class AdminService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    CatalogRepository catalogRepository;

    @Autowired
    PostRepository postRepository;

    @Autowired
    CommentRepository commentRepository;

    public AdminInfoDto getInfo(){
        AdminInfoDto data = new AdminInfoDto();
        data.userCount = userRepository.findAll().size();
        data.forums = catalogRepository.findAll();
        data.catalogCount = data.forums.size();
        data.postCount = postRepository.findAll().size();
        data.commentCount = commentRepository.findAll().size();
        return data;
    }
}
