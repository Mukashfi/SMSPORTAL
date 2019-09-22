package com.smsbulk.app.repository;

import com.smsbulk.app.domain.Packages;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Packages entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PackagesRepository extends JpaRepository<Packages, Long> {

}
