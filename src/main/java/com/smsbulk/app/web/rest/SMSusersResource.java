package com.smsbulk.app.web.rest;

import com.smsbulk.app.domain.SMSusers;
import com.smsbulk.app.domain.User;
import com.smsbulk.app.repository.SMSusersRepository;
import com.smsbulk.app.repository.UserRepository;
import com.smsbulk.app.security.SecurityUtils;
import com.smsbulk.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.smsbulk.app.domain.SMSusers}.
 */
@RestController
@RequestMapping("/api")
public class SMSusersResource {

    private final Logger log = LoggerFactory.getLogger(SMSusersResource.class);

    private static final String ENTITY_NAME = "sMSusers";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SMSusersRepository sMSusersRepository;
    private final UserRepository userRepository;

    public SMSusersResource(SMSusersRepository sMSusersRepository,UserRepository userRepository) {
        this.sMSusersRepository = sMSusersRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /sm-susers} : Create a new sMSusers.
     *
     * @param sMSusers the sMSusers to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sMSusers, or with status {@code 400 (Bad Request)} if the sMSusers has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sm-susers")
    public ResponseEntity<SMSusers> createSMSusers(@RequestBody SMSusers sMSusers) throws URISyntaxException {
        log.debug("REST request to save SMSusers : {}", sMSusers);
        if (sMSusers.getId() != null) {
            throw new BadRequestAlertException("A new sMSusers cannot already have an ID", ENTITY_NAME, "idexists");
        }
      // Mod
        System.out.println("IIIIIIIIIIIIIIIIIIIIIIIII "  );
        final Optional<String> login = SecurityUtils.getCurrentUserLogin();
        Optional<User>  user= userRepository.findOneByLogin(login.get());
        System.out.println("Current working ID " +  user.get().getId());
         //
         sMSusers.setAdminID(user.get().getId());
         //
        SMSusers result = sMSusersRepository.save(sMSusers);
        return ResponseEntity.created(new URI("/api/sm-susers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sm-susers} : Updates an existing sMSusers.
     *
     * @param sMSusers the sMSusers to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sMSusers,
     * or with status {@code 400 (Bad Request)} if the sMSusers is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sMSusers couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sm-susers")
    public ResponseEntity<SMSusers> updateSMSusers(@RequestBody SMSusers sMSusers) throws URISyntaxException {
        log.debug("REST request to update SMSusers : {}", sMSusers);
        if (sMSusers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
         // Mod
         System.out.println("IIIIIIIIIIIIIIIIIIIIIIIII"  );
         final Optional<String> login = SecurityUtils.getCurrentUserLogin();
         Optional<User>  user= userRepository.findOneByLogin(login.get());
         System.out.println("Current working ID " +  user.get().getId());
          //
          sMSusers.setAdminID(user.get().getId());
          //
        SMSusers result = sMSusersRepository.save(sMSusers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sMSusers.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sm-susers} : get all the sMSusers.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sMSusers in body.
     */
    @GetMapping("/sm-susers")
    public ResponseEntity<List<SMSusers>> getAllSMSusers(Pageable pageable) {
        log.debug("REST request to get a page of SMSusers");
        Page<SMSusers> page = sMSusersRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /sm-susers/:id} : get the "id" sMSusers.
     *
     * @param id the id of the sMSusers to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sMSusers, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sm-susers/{id}")
    public ResponseEntity<SMSusers> getSMSusers(@PathVariable Long id) {
        log.debug("REST request to get SMSusers : {}", id);
        Optional<SMSusers> sMSusers = sMSusersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sMSusers);
    }

    /**
     * {@code DELETE  /sm-susers/:id} : delete the "id" sMSusers.
     *
     * @param id the id of the sMSusers to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sm-susers/{id}")
    public ResponseEntity<Void> deleteSMSusers(@PathVariable Long id) {
        log.debug("REST request to delete SMSusers : {}", id);
        sMSusersRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
