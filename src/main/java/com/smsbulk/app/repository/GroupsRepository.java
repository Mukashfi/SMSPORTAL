package com.smsbulk.app.repository;

import com.smsbulk.app.domain.Groups;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Groups entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupsRepository extends JpaRepository<Groups, Long> {
    @Query(value = "SELECT MAX(group_id) FROM groups ", nativeQuery =true )
    int  getMaxgroup(); 
}
