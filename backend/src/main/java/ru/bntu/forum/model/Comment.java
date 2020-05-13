package ru.bntu.forum.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.*;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Comment extends DateAudit  {
    @Id
    @Column(name = "id", length = 16, unique = true, nullable = false)
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "comments_catalog", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "catalog_id"))
    private Catalog catalog;

    private UUID catalogId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "comments_post", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    private Post post;

    private UUID postId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "comments_user", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private User user;

    private UUID userId;

    private String content;

    public Comment(UUID userId, User user, UUID postId, Post post, UUID catalogId, Catalog catalog, String content) {
        this.id = UUID.randomUUID();
        this.userId = userId;
        this.user = user;
        this.postId = postId;
        this.post = post;
        this.catalogId = catalogId;
        this.catalog = catalog;
        this.content = content;
    }
}
