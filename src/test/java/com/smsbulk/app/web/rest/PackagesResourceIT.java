package com.smsbulk.app.web.rest;

import com.smsbulk.app.SmsPortalApp;
import com.smsbulk.app.domain.Packages;
import com.smsbulk.app.repository.PackagesRepository;
import com.smsbulk.app.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.smsbulk.app.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PackagesResource} REST controller.
 */
@SpringBootTest(classes = SmsPortalApp.class)
public class PackagesResourceIT {

    private static final Long DEFAULT_POINTS = 1L;
    private static final Long UPDATED_POINTS = 2L;
    private static final Long SMALLER_POINTS = 1L - 1L;

    private static final Long DEFAULT_PRICE = 1L;
    private static final Long UPDATED_PRICE = 2L;
    private static final Long SMALLER_PRICE = 1L - 1L;

    @Autowired
    private PackagesRepository packagesRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPackagesMockMvc;

    private Packages packages;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PackagesResource packagesResource = new PackagesResource(packagesRepository);
        this.restPackagesMockMvc = MockMvcBuilders.standaloneSetup(packagesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Packages createEntity(EntityManager em) {
        Packages packages = new Packages()
            .points(DEFAULT_POINTS)
            .price(DEFAULT_PRICE);
        return packages;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Packages createUpdatedEntity(EntityManager em) {
        Packages packages = new Packages()
            .points(UPDATED_POINTS)
            .price(UPDATED_PRICE);
        return packages;
    }

    @BeforeEach
    public void initTest() {
        packages = createEntity(em);
    }

    @Test
    @Transactional
    public void createPackages() throws Exception {
        int databaseSizeBeforeCreate = packagesRepository.findAll().size();

        // Create the Packages
        restPackagesMockMvc.perform(post("/api/packages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packages)))
            .andExpect(status().isCreated());

        // Validate the Packages in the database
        List<Packages> packagesList = packagesRepository.findAll();
        assertThat(packagesList).hasSize(databaseSizeBeforeCreate + 1);
        Packages testPackages = packagesList.get(packagesList.size() - 1);
        assertThat(testPackages.getPoints()).isEqualTo(DEFAULT_POINTS);
        assertThat(testPackages.getPrice()).isEqualTo(DEFAULT_PRICE);
    }

    @Test
    @Transactional
    public void createPackagesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = packagesRepository.findAll().size();

        // Create the Packages with an existing ID
        packages.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPackagesMockMvc.perform(post("/api/packages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packages)))
            .andExpect(status().isBadRequest());

        // Validate the Packages in the database
        List<Packages> packagesList = packagesRepository.findAll();
        assertThat(packagesList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPackages() throws Exception {
        // Initialize the database
        packagesRepository.saveAndFlush(packages);

        // Get all the packagesList
        restPackagesMockMvc.perform(get("/api/packages?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(packages.getId().intValue())))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS.intValue())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.intValue())));
    }
    
    @Test
    @Transactional
    public void getPackages() throws Exception {
        // Initialize the database
        packagesRepository.saveAndFlush(packages);

        // Get the packages
        restPackagesMockMvc.perform(get("/api/packages/{id}", packages.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(packages.getId().intValue()))
            .andExpect(jsonPath("$.points").value(DEFAULT_POINTS.intValue()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPackages() throws Exception {
        // Get the packages
        restPackagesMockMvc.perform(get("/api/packages/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePackages() throws Exception {
        // Initialize the database
        packagesRepository.saveAndFlush(packages);

        int databaseSizeBeforeUpdate = packagesRepository.findAll().size();

        // Update the packages
        Packages updatedPackages = packagesRepository.findById(packages.getId()).get();
        // Disconnect from session so that the updates on updatedPackages are not directly saved in db
        em.detach(updatedPackages);
        updatedPackages
            .points(UPDATED_POINTS)
            .price(UPDATED_PRICE);

        restPackagesMockMvc.perform(put("/api/packages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPackages)))
            .andExpect(status().isOk());

        // Validate the Packages in the database
        List<Packages> packagesList = packagesRepository.findAll();
        assertThat(packagesList).hasSize(databaseSizeBeforeUpdate);
        Packages testPackages = packagesList.get(packagesList.size() - 1);
        assertThat(testPackages.getPoints()).isEqualTo(UPDATED_POINTS);
        assertThat(testPackages.getPrice()).isEqualTo(UPDATED_PRICE);
    }

    @Test
    @Transactional
    public void updateNonExistingPackages() throws Exception {
        int databaseSizeBeforeUpdate = packagesRepository.findAll().size();

        // Create the Packages

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPackagesMockMvc.perform(put("/api/packages")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(packages)))
            .andExpect(status().isBadRequest());

        // Validate the Packages in the database
        List<Packages> packagesList = packagesRepository.findAll();
        assertThat(packagesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePackages() throws Exception {
        // Initialize the database
        packagesRepository.saveAndFlush(packages);

        int databaseSizeBeforeDelete = packagesRepository.findAll().size();

        // Delete the packages
        restPackagesMockMvc.perform(delete("/api/packages/{id}", packages.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Packages> packagesList = packagesRepository.findAll();
        assertThat(packagesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Packages.class);
        Packages packages1 = new Packages();
        packages1.setId(1L);
        Packages packages2 = new Packages();
        packages2.setId(packages1.getId());
        assertThat(packages1).isEqualTo(packages2);
        packages2.setId(2L);
        assertThat(packages1).isNotEqualTo(packages2);
        packages1.setId(null);
        assertThat(packages1).isNotEqualTo(packages2);
    }
}
