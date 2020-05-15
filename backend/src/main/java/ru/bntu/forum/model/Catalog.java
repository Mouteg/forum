package ru.bntu.forum.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@EqualsAndHashCode(callSuper = true)
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
    @Column(name = "id", length = 16, unique = true, nullable = false)
    private UUID id;

    private String title;

    private String slug;

}
