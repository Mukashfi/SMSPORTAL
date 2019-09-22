package com.smsbulk.app.web.rest;

import com.smsbulk.app.SmsPortalApp;
import com.smsbulk.app.domain.SubUsers;
import com.smsbulk.app.repository.SubUsersRepository;
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
 * Integration tests for the {@link SubUsersResource} REST controller.
 */
@SpringBootTest(classes = SmsPortalApp.class)
public class SubUsersResourceIT {

    private static final String DEFAULT_USERNAME = "AAAAAAAAAA";
    private static final String UPDATED_USERNAME = "BBBBBBBBBB";

    private static final Long DEFAULT_PARENT_USER_ID = 1L;
    private static final Long UPDATED_PARENT_USER_ID = 2L;
    private static final Long SMALLER_PARENT_USER_ID = 1L - 1L;

    private static final Boolean DEFAULT_IS_AUTHRIZED = false;
    private static final Boolean UPDATED_IS_AUTHRIZED = true;

    private static final Long DEFAULT_SUB_USER_ID = 1L;
    private static final Long UPDATED_SUB_USER_ID = 2L;
    private static final Long SMALLER_SUB_USER_ID = 1L - 1L;

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;
    private static final Long SMALLER_USER_ID = 1L - 1L;

    @Autowired
    private SubUsersRepository subUsersRepository;

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

    private MockMvc restSubUsersMockMvc;

    private SubUsers subUsers;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubUsersResource subUsersResource = new SubUsersResource(subUsersRepository, null);
        this.restSubUsersMockMvc = MockMvcBuilders.standaloneSetup(subUsersResource)
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
    public static SubUsers createEntity(EntityManager em) {
        SubUsers subUsers = new SubUsers()
            .username(DEFAULT_USERNAME)
            .parentUserId(DEFAULT_PARENT_USER_ID)
            .isAuthrized(DEFAULT_IS_AUTHRIZED)
            .subUserId(DEFAULT_SUB_USER_ID)
            .userId(DEFAULT_USER_ID);
        return subUsers;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubUsers createUpdatedEntity(EntityManager em) {
        SubUsers subUsers = new SubUsers()
            .username(UPDATED_USERNAME)
            .parentUserId(UPDATED_PARENT_USER_ID)
            .isAuthrized(UPDATED_IS_AUTHRIZED)
            .subUserId(UPDATED_SUB_USER_ID)
            .userId(UPDATED_USER_ID);
        return subUsers;
    }

    @BeforeEach
    public void initTest() {
        subUsers = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubUsers() throws Exception {
        int databaseSizeBeforeCreate = subUsersRepository.findAll().size();

        // Create the SubUsers
        restSubUsersMockMvc.perform(post("/api/sub-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subUsers)))
            .andExpect(status().isCreated());

        // Validate the SubUsers in the database
        List<SubUsers> subUsersList = subUsersRepository.findAll();
        assertThat(subUsersList).hasSize(databaseSizeBeforeCreate + 1);
        SubUsers testSubUsers = subUsersList.get(subUsersList.size() - 1);
        assertThat(testSubUsers.getUsername()).isEqualTo(DEFAULT_USERNAME);
        assertThat(testSubUsers.getParentUserId()).isEqualTo(DEFAULT_PARENT_USER_ID);
        assertThat(testSubUsers.isIsAuthrized()).isEqualTo(DEFAULT_IS_AUTHRIZED);
        assertThat(testSubUsers.getSubUserId()).isEqualTo(DEFAULT_SUB_USER_ID);
        assertThat(testSubUsers.getUserId()).isEqualTo(DEFAULT_USER_ID);
    }

    @Test
    @Transactional
    public void createSubUsersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subUsersRepository.findAll().size();

        // Create the SubUsers with an existing ID
        subUsers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubUsersMockMvc.perform(post("/api/sub-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subUsers)))
            .andExpect(status().isBadRequest());

        // Validate the SubUsers in the database
        List<SubUsers> subUsersList = subUsersRepository.findAll();
        assertThat(subUsersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSubUsers() throws Exception {
        // Initialize the database
        subUsersRepository.saveAndFlush(subUsers);

        // Get all the subUsersList
        restSubUsersMockMvc.perform(get("/api/sub-users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subUsers.getId().intValue())))
            .andExpect(jsonPath("$.[*].username").value(hasItem(DEFAULT_USERNAME.toString())))
            .andExpect(jsonPath("$.[*].parentUserId").value(hasItem(DEFAULT_PARENT_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].isAuthrized").value(hasItem(DEFAULT_IS_AUTHRIZED.booleanValue())))
            .andExpect(jsonPath("$.[*].subUserId").value(hasItem(DEFAULT_SUB_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getSubUsers() throws Exception {
        // Initialize the database
        subUsersRepository.saveAndFlush(subUsers);

        // Get the subUsers
        restSubUsersMockMvc.perform(get("/api/sub-users/{id}", subUsers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subUsers.getId().intValue()))
            .andExpect(jsonPath("$.username").value(DEFAULT_USERNAME.toString()))
            .andExpect(jsonPath("$.parentUserId").value(DEFAULT_PARENT_USER_ID.intValue()))
            .andExpect(jsonPath("$.isAuthrized").value(DEFAULT_IS_AUTHRIZED.booleanValue()))
            .andExpect(jsonPath("$.subUserId").value(DEFAULT_SUB_USER_ID.intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSubUsers() throws Exception {
        // Get the subUsers
        restSubUsersMockMvc.perform(get("/api/sub-users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubUsers() throws Exception {
        // Initialize the database
        subUsersRepository.saveAndFlush(subUsers);

        int databaseSizeBeforeUpdate = subUsersRepository.findAll().size();

        // Update the subUsers
        SubUsers updatedSubUsers = subUsersRepository.findById(subUsers.getId()).get();
        // Disconnect from session so that the updates on updatedSubUsers are not directly saved in db
        em.detach(updatedSubUsers);
        updatedSubUsers
            .username(UPDATED_USERNAME)
            .parentUserId(UPDATED_PARENT_USER_ID)
            .isAuthrized(UPDATED_IS_AUTHRIZED)
            .subUserId(UPDATED_SUB_USER_ID)
            .userId(UPDATED_USER_ID);

        restSubUsersMockMvc.perform(put("/api/sub-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSubUsers)))
            .andExpect(status().isOk());

        // Validate the SubUsers in the database
        List<SubUsers> subUsersList = subUsersRepository.findAll();
        assertThat(subUsersList).hasSize(databaseSizeBeforeUpdate);
        SubUsers testSubUsers = subUsersList.get(subUsersList.size() - 1);
        assertThat(testSubUsers.getUsername()).isEqualTo(UPDATED_USERNAME);
        assertThat(testSubUsers.getParentUserId()).isEqualTo(UPDATED_PARENT_USER_ID);
        assertThat(testSubUsers.isIsAuthrized()).isEqualTo(UPDATED_IS_AUTHRIZED);
        assertThat(testSubUsers.getSubUserId()).isEqualTo(UPDATED_SUB_USER_ID);
        assertThat(testSubUsers.getUserId()).isEqualTo(UPDATED_USER_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingSubUsers() throws Exception {
        int databaseSizeBeforeUpdate = subUsersRepository.findAll().size();

        // Create the SubUsers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSubUsersMockMvc.perform(put("/api/sub-users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subUsers)))
            .andExpect(status().isBadRequest());

        // Validate the SubUsers in the database
        List<SubUsers> subUsersList = subUsersRepository.findAll();
        assertThat(subUsersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubUsers() throws Exception {
        // Initialize the database
        subUsersRepository.saveAndFlush(subUsers);

        int databaseSizeBeforeDelete = subUsersRepository.findAll().size();

        // Delete the subUsers
        restSubUsersMockMvc.perform(delete("/api/sub-users/{id}", subUsers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SubUsers> subUsersList = subUsersRepository.findAll();
        assertThat(subUsersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubUsers.class);
        SubUsers subUsers1 = new SubUsers();
        subUsers1.setId(1L);
        SubUsers subUsers2 = new SubUsers();
        subUsers2.setId(subUsers1.getId());
        assertThat(subUsers1).isEqualTo(subUsers2);
        subUsers2.setId(2L);
        assertThat(subUsers1).isNotEqualTo(subUsers2);
        subUsers1.setId(null);
        assertThat(subUsers1).isNotEqualTo(subUsers2);
    }
}
