package ru.bntu.forum.model;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;

import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@Table(value="catalog")
public class Catalog extends DateAudit{
	
	public Catalog(String title, String slug){
        this.id = UUID.randomUUID();
        this.title = title;
        this.slug = slug;
    }
	
    @Id
    @Column(name = "id", length = 16, unique = true, nullable = false)
    private UUID id;

    private String title;

    private String slug;

    @OneToMany
    @JoinTable(name = "catalog_posts", joinColumns = @JoinColumn(name = "catalog_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
    private List<Post> posts = new ArrayList<>();

}
