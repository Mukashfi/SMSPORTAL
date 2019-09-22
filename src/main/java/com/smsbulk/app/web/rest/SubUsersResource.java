package com.smsbulk.app.web.rest;

import com.smsbulk.app.domain.SubUsers;
import com.smsbulk.app.domain.User;
import com.smsbulk.app.repository.SubUsersRepository;
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
 * REST controller for managing {@link com.smsbulk.app.domain.SubUsers}.
 */
@RestController
@RequestMapping("/api")
public class SubUsersResource {

    private final Logger log = LoggerFactory.getLogger(SubUsersResource.class);

    private static final String ENTITY_NAME = "subUsers";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubUsersRepository subUsersRepository;
    private final UserRepository userRepository;

    public SubUsersResource(SubUsersRepository subUsersRepository, UserRepository userRepository) {
        this.subUsersRepository = subUsersRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /sub-users} : Create a new subUsers.
     *
     * @param subUsers the subUsers to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with
     *         body the new subUsers, or with status {@code 400 (Bad Request)} if
     *         the subUsers has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sub-users")
    public ResponseEntity<SubUsers> createSubUsers(@RequestBody SubUsers subUsers) throws URISyntaxException {
        log.debug("REST request to save SubUsers : {}", subUsers);
        if (subUsers.getId() != null) {
            throw new BadRequestAlertException("A new subUsers cannot already have an ID", ENTITY_NAME, "idexists");
        }
        System.out.println("MMMMMMMMMMMMMMMMMMMMM ");
        final Optional<String> login = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = userRepository.findOneByLogin(login.get());
        System.out.println("Current working ID " +  user.get().getId());
        Long LastID = subUsersRepository.getMaxSub();
        System.out.println("IIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIIII     " + LastID );
        subUsers.setSubUserId(LastID + 1 );
        subUsers.setParentUserId(user.get().getId());
        subUsers.setIsAuthrized(false);
         
        SubUsers result = subUsersRepository.save(subUsers);
        return ResponseEntity.created(new URI("/api/sub-users/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sub-users} : Updates an existing subUsers.
     *
     * @param subUsers the subUsers to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated subUsers,
     * or with status {@code 400 (Bad Request)} if the subUsers is not valid,
     * or with status {@code 500 (Internal Server Error)} if the subUsers couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sub-users")
    public ResponseEntity<SubUsers> updateSubUsers(@RequestBody SubUsers subUsers) throws URISyntaxException {
        log.debug("REST request to update SubUsers : {}", subUsers);
        if (subUsers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubUsers result = subUsersRepository.save(subUsers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, subUsers.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sub-users} : get all the subUsers.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of subUsers in body.
     */
    @GetMapping("/sub-users")
    public ResponseEntity<List<SubUsers>> getAllSubUsers(Pageable pageable) {
        log.debug("REST request to get a page of SubUsers");
        Page<SubUsers> page = subUsersRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /sub-users/:id} : get the "id" subUsers.
     *
     * @param id the id of the subUsers to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the subUsers, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sub-users/{id}")
    public ResponseEntity<SubUsers> getSubUsers(@PathVariable Long id) {
        log.debug("REST request to get SubUsers : {}", id);
        Optional<SubUsers> subUsers = subUsersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(subUsers);
    }

    /**
     * {@code DELETE  /sub-users/:id} : delete the "id" subUsers.
     *
     * @param id the id of the subUsers to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sub-users/{id}")
    public ResponseEntity<Void> deleteSubUsers(@PathVariable Long id) {
        log.debug("REST request to delete SubUsers : {}", id);
        subUsersRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
