package com.smsbulk.app.web.rest;

import com.smsbulk.app.domain.Senders;
import com.smsbulk.app.domain.User;
import com.smsbulk.app.repository.SendersRepository;
import com.smsbulk.app.repository.UserRepository;
import com.smsbulk.app.security.SecurityUtils;
import com.smsbulk.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.smsbulk.app.domain.Senders}.
 */
@RestController
@RequestMapping("/api")
public class SendersResource {

    private final Logger log = LoggerFactory.getLogger(SendersResource.class);

    private static final String ENTITY_NAME = "senders";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SendersRepository sendersRepository;
    private final UserRepository userRepository;
    
    
    public SendersResource(SendersRepository sendersRepository,UserRepository userRepository) {
        this.sendersRepository = sendersRepository;
        this.userRepository = userRepository;
    }

    /**
     * {@code POST  /senders} : Create a new senders.
     *
     * @param senders the senders to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new senders, or with status {@code 400 (Bad Request)} if the senders has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/senders")
    public ResponseEntity<Senders> createSenders(@RequestBody Senders senders) throws URISyntaxException {
        log.debug("REST request to save Senders : {}", senders);
        if (senders.getId() != null) {
            throw new BadRequestAlertException("A new senders cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Senders result = sendersRepository.save(senders);
        return ResponseEntity.created(new URI("/api/senders/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /senders} : Updates an existing senders.
     *
     * @param senders the senders to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated senders,
     * or with status {@code 400 (Bad Request)} if the senders is not valid,
     * or with status {@code 500 (Internal Server Error)} if the senders couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/senders")
    public ResponseEntity<Senders> updateSenders(@RequestBody Senders senders) throws URISyntaxException {
        log.debug("REST request to update Senders : {}", senders);
        if (senders.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Senders result = sendersRepository.save(senders);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, senders.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /senders} : get all the senders.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of senders in body.
     */
    @GetMapping("/senders")
    public ResponseEntity<List<Senders>> getAllSenders(Pageable pageable) {
        log.debug("REST request to get a page of Senders");
        Page<Senders> page = sendersRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /senders/:id} : get the "id" senders.
     *
     * @param id the id of the senders to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the senders, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/senders/{id}")
    public ResponseEntity<Senders> getSenders(@PathVariable Long id) {
        log.debug("REST request to get Senders : {}", id);
        Optional<Senders> senders = sendersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(senders);
    }
    @GetMapping("/senders/getsenders")
    public String getID() throws JSONException {
        System.out.println("GetID   DDDDDDDDDDDDDDDDDDDDDD");
        final Optional<String> login = SecurityUtils.getCurrentUserLogin();
        Optional<User> user = userRepository.findOneByLogin(login.get());
        System.out.println("Current working ID " +  user.get().getId());
        List<Senders> packages = sendersRepository.findByUserId(user.get().getId());
        List<String> list = new ArrayList<>();
        for (Senders packagess : packages){
            System.out.println(packagess.getSender());
            list.add(("\"" + packagess.getSender()) +"\"");
        }
        JSONObject jObject = new JSONObject();
        jObject.put("data", (list ));
       return jObject.toString();
    }

    /**
     * {@code DELETE  /senders/:id} : delete the "id" senders.
     *
     * @param id the id of the senders to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/senders/{id}")
    public ResponseEntity<Void> deleteSenders(@PathVariable Long id) {
        log.debug("REST request to delete Senders : {}", id);
        sendersRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
