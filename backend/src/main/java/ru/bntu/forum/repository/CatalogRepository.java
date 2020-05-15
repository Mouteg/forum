package ru.bntu.forum.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.bntu.forum.model.Catalog;

@Repository
public interface CatalogRepository extends JpaRepository<Catalog, UUID> {
	
    Catalog findBySlug(String slug);
}
