package ru.bntu.forum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bntu.forum.model.Tag;

import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {
}
