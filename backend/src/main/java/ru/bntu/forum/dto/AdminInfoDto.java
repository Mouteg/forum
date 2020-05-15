package ru.bntu.forum.dto;

import ru.bntu.forum.model.Catalog;

import java.util.List;

public class AdminInfoDto {
	
    public int userCount;
    
    public int discussionCount;
    
    public int opinionCount;
    
    public int forumCount;
    
    public List<Catalog> forums;
}
