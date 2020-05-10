package ru.bntu.forum.model;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Post extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "posts_catalog", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "catalog_id"))
    private Catalog catalog = new Catalog();

    private UUID catalogId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "posts_user", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private User user = new User();

    private UUID userId;

    private String title;

    @Lob
    private String content;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "users_post", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> favorites;

    private List<String> tags = new ArrayList<String>();

    private String slug;

    private boolean pinned;
}
