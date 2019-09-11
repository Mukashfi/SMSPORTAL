package com.smsbulk.app.repository;

import com.smsbulk.app.domain.Senders;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Senders entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SendersRepository extends JpaRepository<Senders, Long> {

}
