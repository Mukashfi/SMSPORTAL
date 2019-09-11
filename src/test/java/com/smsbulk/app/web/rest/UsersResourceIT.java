package com.smsbulk.app.web.rest;

import com.smsbulk.app.SmsPortalApp;
import com.smsbulk.app.domain.Users;
import com.smsbulk.app.repository.UsersRepository;
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
 * Integration tests for the {@link UsersResource} REST controller.
 */
@SpringBootTest(classes = SmsPortalApp.class)
public class UsersResourceIT {

    private static final Long DEFAULT_POINTS = 1L;
    private static final Long UPDATED_POINTS = 2L;
    private static final Long SMALLER_POINTS = 1L - 1L;

    private static final String DEFAULT_SENDER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_SENDER_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ACTIVE = false;
    private static final Boolean UPDATED_IS_ACTIVE = true;

    private static final Boolean DEFAULT_S_MPP = false;
    private static final Boolean UPDATED_S_MPP = true;

    private static final Boolean DEFAULT_IS_TRUST = false;
    private static final Boolean UPDATED_IS_TRUST = true;

    private static final String DEFAULT_NOTES = "AAAAAAAAAA";
    private static final String UPDATED_NOTES = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_MMS = false;
    private static final Boolean UPDATED_IS_MMS = true;

    private static final Boolean DEFAULT_IS_HTTP = false;
    private static final Boolean UPDATED_IS_HTTP = true;

    private static final Long DEFAULT_ADMIN_ID = 1L;
    private static final Long UPDATED_ADMIN_ID = 2L;
    private static final Long SMALLER_ADMIN_ID = 1L - 1L;

    @Autowired
    private UsersRepository usersRepository;

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

    private MockMvc restUsersMockMvc;

    private Users users;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UsersResource usersResource = new UsersResource(usersRepository);
        this.restUsersMockMvc = MockMvcBuilders.standaloneSetup(usersResource)
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
    public static Users createEntity(EntityManager em) {
        Users users = new Users()
            .points(DEFAULT_POINTS)
            .senderName(DEFAULT_SENDER_NAME)
            .isActive(DEFAULT_IS_ACTIVE)
            .sMPP(DEFAULT_S_MPP)
            .isTrust(DEFAULT_IS_TRUST)
            .notes(DEFAULT_NOTES)
            .phone(DEFAULT_PHONE)
            .isMMS(DEFAULT_IS_MMS)
            .isHTTP(DEFAULT_IS_HTTP)
            .adminID(DEFAULT_ADMIN_ID);
        return users;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Users createUpdatedEntity(EntityManager em) {
        Users users = new Users()
            .points(UPDATED_POINTS)
            .senderName(UPDATED_SENDER_NAME)
            .isActive(UPDATED_IS_ACTIVE)
            .sMPP(UPDATED_S_MPP)
            .isTrust(UPDATED_IS_TRUST)
            .notes(UPDATED_NOTES)
            .phone(UPDATED_PHONE)
            .isMMS(UPDATED_IS_MMS)
            .isHTTP(UPDATED_IS_HTTP)
            .adminID(UPDATED_ADMIN_ID);
        return users;
    }

    @BeforeEach
    public void initTest() {
        users = createEntity(em);
    }

    @Test
    @Transactional
    public void createUsers() throws Exception {
        int databaseSizeBeforeCreate = usersRepository.findAll().size();

        // Create the Users
        restUsersMockMvc.perform(post("/api/users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(users)))
            .andExpect(status().isCreated());

        // Validate the Users in the database
        List<Users> usersList = usersRepository.findAll();
        assertThat(usersList).hasSize(databaseSizeBeforeCreate + 1);
        Users testUsers = usersList.get(usersList.size() - 1);
        assertThat(testUsers.getPoints()).isEqualTo(DEFAULT_POINTS);
        assertThat(testUsers.getSenderName()).isEqualTo(DEFAULT_SENDER_NAME);
        assertThat(testUsers.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testUsers.issMPP()).isEqualTo(DEFAULT_S_MPP);
        assertThat(testUsers.isIsTrust()).isEqualTo(DEFAULT_IS_TRUST);
        assertThat(testUsers.getNotes()).isEqualTo(DEFAULT_NOTES);
        assertThat(testUsers.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testUsers.isIsMMS()).isEqualTo(DEFAULT_IS_MMS);
        assertThat(testUsers.isIsHTTP()).isEqualTo(DEFAULT_IS_HTTP);
        assertThat(testUsers.getAdminID()).isEqualTo(DEFAULT_ADMIN_ID);
    }

    @Test
    @Transactional
    public void createUsersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = usersRepository.findAll().size();

        // Create the Users with an existing ID
        users.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsersMockMvc.perform(post("/api/users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(users)))
            .andExpect(status().isBadRequest());

        // Validate the Users in the database
        List<Users> usersList = usersRepository.findAll();
        assertThat(usersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUsers() throws Exception {
        // Initialize the database
        usersRepository.saveAndFlush(users);

        // Get all the usersList
        restUsersMockMvc.perform(get("/api/users?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(users.getId().intValue())))
            .andExpect(jsonPath("$.[*].points").value(hasItem(DEFAULT_POINTS.intValue())))
            .andExpect(jsonPath("$.[*].senderName").value(hasItem(DEFAULT_SENDER_NAME.toString())))
            .andExpect(jsonPath("$.[*].isActive").value(hasItem(DEFAULT_IS_ACTIVE.booleanValue())))
            .andExpect(jsonPath("$.[*].sMPP").value(hasItem(DEFAULT_S_MPP.booleanValue())))
            .andExpect(jsonPath("$.[*].isTrust").value(hasItem(DEFAULT_IS_TRUST.booleanValue())))
            .andExpect(jsonPath("$.[*].notes").value(hasItem(DEFAULT_NOTES.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].isMMS").value(hasItem(DEFAULT_IS_MMS.booleanValue())))
            .andExpect(jsonPath("$.[*].isHTTP").value(hasItem(DEFAULT_IS_HTTP.booleanValue())))
            .andExpect(jsonPath("$.[*].adminID").value(hasItem(DEFAULT_ADMIN_ID.intValue())));
    }
    
    @Test
    @Transactional
    public void getUsers() throws Exception {
        // Initialize the database
        usersRepository.saveAndFlush(users);

        // Get the users
        restUsersMockMvc.perform(get("/api/users/{id}", users.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(users.getId().intValue()))
            .andExpect(jsonPath("$.points").value(DEFAULT_POINTS.intValue()))
            .andExpect(jsonPath("$.senderName").value(DEFAULT_SENDER_NAME.toString()))
            .andExpect(jsonPath("$.isActive").value(DEFAULT_IS_ACTIVE.booleanValue()))
            .andExpect(jsonPath("$.sMPP").value(DEFAULT_S_MPP.booleanValue()))
            .andExpect(jsonPath("$.isTrust").value(DEFAULT_IS_TRUST.booleanValue()))
            .andExpect(jsonPath("$.notes").value(DEFAULT_NOTES.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.isMMS").value(DEFAULT_IS_MMS.booleanValue()))
            .andExpect(jsonPath("$.isHTTP").value(DEFAULT_IS_HTTP.booleanValue()))
            .andExpect(jsonPath("$.adminID").value(DEFAULT_ADMIN_ID.intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUsers() throws Exception {
        // Get the users
        restUsersMockMvc.perform(get("/api/users/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUsers() throws Exception {
        // Initialize the database
        usersRepository.saveAndFlush(users);

        int databaseSizeBeforeUpdate = usersRepository.findAll().size();

        // Update the users
        Users updatedUsers = usersRepository.findById(users.getId()).get();
        // Disconnect from session so that the updates on updatedUsers are not directly saved in db
        em.detach(updatedUsers);
        updatedUsers
            .points(UPDATED_POINTS)
            .senderName(UPDATED_SENDER_NAME)
            .isActive(UPDATED_IS_ACTIVE)
            .sMPP(UPDATED_S_MPP)
            .isTrust(UPDATED_IS_TRUST)
            .notes(UPDATED_NOTES)
            .phone(UPDATED_PHONE)
            .isMMS(UPDATED_IS_MMS)
            .isHTTP(UPDATED_IS_HTTP)
            .adminID(UPDATED_ADMIN_ID);

        restUsersMockMvc.perform(put("/api/users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUsers)))
            .andExpect(status().isOk());

        // Validate the Users in the database
        List<Users> usersList = usersRepository.findAll();
        assertThat(usersList).hasSize(databaseSizeBeforeUpdate);
        Users testUsers = usersList.get(usersList.size() - 1);
        assertThat(testUsers.getPoints()).isEqualTo(UPDATED_POINTS);
        assertThat(testUsers.getSenderName()).isEqualTo(UPDATED_SENDER_NAME);
        assertThat(testUsers.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testUsers.issMPP()).isEqualTo(UPDATED_S_MPP);
        assertThat(testUsers.isIsTrust()).isEqualTo(UPDATED_IS_TRUST);
        assertThat(testUsers.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testUsers.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testUsers.isIsMMS()).isEqualTo(UPDATED_IS_MMS);
        assertThat(testUsers.isIsHTTP()).isEqualTo(UPDATED_IS_HTTP);
        assertThat(testUsers.getAdminID()).isEqualTo(UPDATED_ADMIN_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingUsers() throws Exception {
        int databaseSizeBeforeUpdate = usersRepository.findAll().size();

        // Create the Users

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsersMockMvc.perform(put("/api/users")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(users)))
            .andExpect(status().isBadRequest());

        // Validate the Users in the database
        List<Users> usersList = usersRepository.findAll();
        assertThat(usersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUsers() throws Exception {
        // Initialize the database
        usersRepository.saveAndFlush(users);

        int databaseSizeBeforeDelete = usersRepository.findAll().size();

        // Delete the users
        restUsersMockMvc.perform(delete("/api/users/{id}", users.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Users> usersList = usersRepository.findAll();
        assertThat(usersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Users.class);
        Users users1 = new Users();
        users1.setId(1L);
        Users users2 = new Users();
        users2.setId(users1.getId());
        assertThat(users1).isEqualTo(users2);
        users2.setId(2L);
        assertThat(users1).isNotEqualTo(users2);
        users1.setId(null);
        assertThat(users1).isNotEqualTo(users2);
    }
}
