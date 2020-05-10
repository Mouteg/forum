package ru.bntu.forum.model;

import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Data
public class Comment extends DateAudit  {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "comments_catalog", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "catalog_id"))
    private Catalog catalog = new Catalog();

    private UUID catalogId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "comments_post", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    private Post post = new Post();

    private UUID postId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "comments_user", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private User user = new User();

    private UUID userId;

    private String text;
}
