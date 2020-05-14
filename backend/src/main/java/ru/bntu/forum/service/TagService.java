package ru.bntu.forum.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.bntu.forum.repository.TagRepository;

@Service
public class TagService {

    @Autowired
    TagRepository tagRepository;

    public void createTag(){
//        Tag tag = tagRepository.find
    }
}
