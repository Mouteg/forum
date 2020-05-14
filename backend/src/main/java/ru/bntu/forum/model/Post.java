package ru.bntu.forum.model;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
public class Post extends DateAudit {

	public Post(UUID userId,
	            User user,
	            UUID catalogId,
	            Catalog catalog,
	            String title,
	            String content,
	            List<Tag> tags,
	            boolean pinned,
	            String slug) {
		
	    this.id = UUID.randomUUID();
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
	
	@Id
    @Column(name = "id", length = 16, unique = true, nullable = false)
    private UUID id;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "catalog_posts", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "catalog_id"))
    private Catalog catalog;

    private UUID catalogId;
    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinTable(name = "user_posts", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private User user;

    private UUID userId;

    private String title;

    @Lob
    private String content;

    @ManyToMany
    @JoinTable(name = "favorites_post", joinColumns = @JoinColumn(name = "post_id"), inverseJoinColumns = @JoinColumn(name = "user_id"))
    private Set<User> favorites = new HashSet<>();

    @ManyToMany
    @JoinTable(name = "posts_tag", joinColumns = @JoinColumn(name = "tag_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    private List<Tag> tags;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinTable(name = "post_comments", joinColumns = @JoinColumn(name = "comment_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    private List<Comment> comments;
    
    private String slug;

    private boolean pinned;
}
