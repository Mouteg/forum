package ru.bntu.forum.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bntu.forum.model.Catalog;

public interface CatalogRepository extends JpaRepository<Catalog, UUID> {
    Catalog findBySlug(String slug);
}
