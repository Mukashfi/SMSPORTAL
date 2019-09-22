package com.smsbulk.app.web.rest;

import com.smsbulk.app.domain.Packages;
import com.smsbulk.app.repository.PackagesRepository;
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

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.smsbulk.app.domain.Packages}.
 */
@RestController
@RequestMapping("/api")
public class PackagesResource {

    private final Logger log = LoggerFactory.getLogger(PackagesResource.class);

    private static final String ENTITY_NAME = "packages";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PackagesRepository packagesRepository;

    public PackagesResource(PackagesRepository packagesRepository) {
        this.packagesRepository = packagesRepository;
    }

    /**
     * {@code POST  /packages} : Create a new packages.
     *
     * @param packages the packages to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new packages, or with status {@code 400 (Bad Request)} if the packages has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/packages")
    public ResponseEntity<Packages> createPackages(@RequestBody Packages packages) throws URISyntaxException {
        log.debug("REST request to save Packages : {}", packages);
        if (packages.getId() != null) {
            throw new BadRequestAlertException("A new packages cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Packages result = packagesRepository.save(packages);
        return ResponseEntity.created(new URI("/api/packages/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /packages} : Updates an existing packages.
     *
     * @param packages the packages to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated packages,
     * or with status {@code 400 (Bad Request)} if the packages is not valid,
     * or with status {@code 500 (Internal Server Error)} if the packages couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/packages")
    public ResponseEntity<Packages> updatePackages(@RequestBody Packages packages) throws URISyntaxException {
        log.debug("REST request to update Packages : {}", packages);
        if (packages.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Packages result = packagesRepository.save(packages);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, packages.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /packages} : get all the packages.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of packages in body.
     */
    @GetMapping("/packages")
    public ResponseEntity<List<Packages>> getAllPackages(Pageable pageable) {
        log.debug("REST request to get a page of Packages");
        Page<Packages> page = packagesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    @GetMapping("/packages/getpoints")
    public String getID() throws JSONException {
        System.out.println("GetID   DDDDDDDDDDDDDDDDDDDDDD");
        JSONObject jObject = new JSONObject();
        int data = 1 ;
        jObject.put("data", (data + ""));
       return jObject.toString();
    }
    /**
     * {@code GET  /packages/:id} : get the "id" packages.
     *
     * @param id the id of the packages to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the packages, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/packages/{id}")
    public ResponseEntity<Packages> getPackages(@PathVariable Long id) {
        log.debug("REST request to get Packages : {}", id);
        Optional<Packages> packages = packagesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(packages);
    }

    /**
     * {@code DELETE  /packages/:id} : delete the "id" packages.
     *
     * @param id the id of the packages to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/packages/{id}")
    public ResponseEntity<Void> deletePackages(@PathVariable Long id) {
        log.debug("REST request to delete Packages : {}", id);
        packagesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
