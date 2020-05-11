package ru.bntu.forum.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
//@NoArgsConstructor
public class Post extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "posts_catalog", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "catalog_id"))
    private Catalog catalog;

    private UUID catalogId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "posts_user", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private User user;

    private UUID userId;

    private String title;

    @Lob
    private String content;

    @ManyToMany
    @JoinTable(name = "users_post", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private List<User> favorites = new ArrayList<>();

    @ManyToMany
    @JoinTable(name = "posts_tag", joinColumns = @JoinColumn(name = "tag_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    private List<Tag> tags;

    @OneToMany
    @JoinTable(name = "post_comments", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    private List<Comment> comments;
    
    private String slug;

    private boolean pinned;

    public Post(UUID userId,
                User user,
                UUID catalogId,
                Catalog catalog,
                String title,
                String content,
                List<Tag> tags,
                boolean pinned,
                String slug) {
        this.userId = userId;
        this.user = user;
        this.catalogId = catalogId;
        this.catalog = catalog;
        this.title = title;
        this.content = content;
        this.tags = tags;
        this.pinned = pinned;
        this.slug = slug;
    }
}
