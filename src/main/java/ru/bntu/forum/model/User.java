package ru.bntu.forum.model;

import org.hibernate.annotations.NaturalId;
import ru.bntu.forum.enums.Locales;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.HashSet;
import java.util.Set;

@Entity
public class User extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank
    @Size(max = 15)

    @Column(unique=true)
    private String username;

    @NaturalId
    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    private String password;

    private boolean blocked;

    @Enumerated(EnumType.STRING)
    private Locales locale;

//    @ManyToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
//    private Set<Role> roles = new HashSet<>();

//    @OneToMany(fetch = FetchType.EAGER)
//    @JoinTable(name = "user_posts", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
//    private Set<Post> posts = new HashSet<>();
//
//    public void addRole(Role role) {
//        roles.add(role);
//    }

}
