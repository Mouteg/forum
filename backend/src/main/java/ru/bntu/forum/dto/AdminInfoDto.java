package ru.bntu.forum.dto;

import ru.bntu.forum.model.Catalog;

import java.util.List;

public class AdminInfoDto {
    public int userCount;
    public int postCount;
    public int commentCount;
    public int catalogCount;
    public List<Catalog> catalogs;
}
