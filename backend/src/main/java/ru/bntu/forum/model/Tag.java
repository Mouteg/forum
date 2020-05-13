package ru.bntu.forum.model;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
public class Tag extends DateAudit {
    @Id
    @Column(name = "id", length = 16, unique = true, nullable = false)
    private UUID id;

    private String name;
}
