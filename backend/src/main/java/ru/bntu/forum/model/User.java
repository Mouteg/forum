package ru.bntu.forum.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
@Table("user")
public class User extends DateAudit {

	public User(String username, String email, String passwordHash) {
		this.username = username;
		this.email = email;
		this.passwordHash = passwordHash;
		this.id = UUID.randomUUID();
	}

	@Id
    @Column(name = "id", length = 16, unique = true, nullable = false)
    private UUID id;

    @NotBlank
    @Size(max = 15)
    @Column(unique=true)
    private String username;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    private String passwordHash;

    private String role;

//    @OneToMany(cascade = CascadeType.ALL)
//    @JoinTable(name = "user_posts", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "post_id"))
//    private Set<Post> posts = new HashSet<>();

}
