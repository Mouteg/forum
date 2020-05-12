package ru.bntu.forum.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
public class Catalog extends DateAudit{

    public Catalog(String title, String slug){
        this.id = UUID.randomUUID();
        this.title = title;
        this.slug = slug;
    }

    @Id
    private UUID id;

    private String title;

    private String slug;

    @OneToMany
    @JoinTable(name = "catalog_posts", joinColumns = @JoinColumn(name = "catalog_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    private Set<Post> posts = new HashSet<>();

}
