package ru.bntu.forum.model;

import javax.persistence.*;

@Entity
public class Post extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Lob
    private String text;

}
