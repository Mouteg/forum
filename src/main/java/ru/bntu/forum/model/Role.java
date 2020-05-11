package ru.bntu.forum.model;

import lombok.Data;
import org.hibernate.annotations.NaturalId;
import ru.bntu.forum.enums.Roles;

import java.util.UUID;

import javax.persistence.*;


@Entity
@Data
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    private Roles name;

}
