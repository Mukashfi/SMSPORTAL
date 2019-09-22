package com.smsbulk.app.repository;

import com.smsbulk.app.domain.SubUsers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SubUsers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubUsersRepository extends JpaRepository<SubUsers, Long> {
 
    @Query(value = "SELECT MAX(SUB_USER_ID) FROM SUB_USERS ", nativeQuery =true )
     Long  getMaxSub(); 
}
