package ru.bntu.forum.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
public class Comment extends DateAudit  {

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
	
	@Id
    @Column(name = "id", length = 16, unique = true, nullable = false)
    private UUID id;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "comments_catalog", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "catalog_id"))
    private Catalog catalog;

    private UUID catalogId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "post_comments", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    private Post post;

    private UUID postId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "comments_user", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private User user;

    private UUID userId;

    private String content;
}
