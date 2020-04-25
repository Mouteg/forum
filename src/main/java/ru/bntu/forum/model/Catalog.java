package ru.bntu.forum.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Catalog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String name;

    @Lob
    private String description;

//    @OneToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "catalog_posts", joinColumns = @JoinColumn(name = "catalog_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
//    private Set<Post> posts = new HashSet<>();

}
