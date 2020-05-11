package ru.bntu.forum.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.bntu.forum.model.Catalog;

import java.util.UUID;

public interface CatalogRepository extends JpaRepository<Catalog, UUID> {
}
