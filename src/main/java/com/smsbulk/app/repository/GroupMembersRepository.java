package com.smsbulk.app.repository;

import com.smsbulk.app.domain.GroupMembers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GroupMembers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GroupMembersRepository extends JpaRepository<GroupMembers, Long> {

}
