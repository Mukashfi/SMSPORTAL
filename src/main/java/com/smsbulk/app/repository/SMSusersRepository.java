package com.smsbulk.app.repository;

import com.smsbulk.app.domain.SMSusers;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the SMSusers entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SMSusersRepository extends JpaRepository<SMSusers, Long> {

}
