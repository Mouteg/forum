package ru.bntu.forum.model;

import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import org.springframework.data.relational.core.mapping.Table;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;


@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@NoArgsConstructor
public class Tag extends DateAudit {
	
	public Tag(String name) {
		this.name = name;
		this.id = UUID.randomUUID();
	}

	@Id
    @Column(name = "id", length = 16, unique = true, nullable = false)
    private UUID id;

    private String name;
}
