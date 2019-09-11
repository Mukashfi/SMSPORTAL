package com.smsbulk.app.web.rest;

import com.smsbulk.app.SmsPortalApp;
import com.smsbulk.app.domain.SMSusers;
import com.smsbulk.app.repository.SMSusersRepository;
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
 * Integration tests for the {@link SMSusersResource} REST controller.
 */
@SpringBootTest(classes = SmsPortalApp.class)
public class SMSusersResourceIT {

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
    private SMSusersRepository sMSusersRepository;

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

    private MockMvc restSMSusersMockMvc;

    private SMSusers sMSusers;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SMSusersResource sMSusersResource = new SMSusersResource(sMSusersRepository);
        this.restSMSusersMockMvc = MockMvcBuilders.standaloneSetup(sMSusersResource)
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
    public static SMSusers createEntity(EntityManager em) {
        SMSusers sMSusers = new SMSusers()
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
        return sMSusers;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SMSusers createUpdatedEntity(EntityManager em) {
        SMSusers sMSusers = new SMSusers()
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
        return sMSusers;
    }

    @BeforeEach
    public void initTest() {
        sMSusers = createEntity(em);
    }

    @Test
    @Transactional
    public void createSMSusers() throws Exception {
        int databaseSizeBeforeCreate = sMSusersRepository.findAll().size();

        // Create the SMSusers
        restSMSusersMockMvc.perform(post("/api/sm-susers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sMSusers)))
            .andExpect(status().isCreated());

        // Validate the SMSusers in the database
        List<SMSusers> sMSusersList = sMSusersRepository.findAll();
        assertThat(sMSusersList).hasSize(databaseSizeBeforeCreate + 1);
        SMSusers testSMSusers = sMSusersList.get(sMSusersList.size() - 1);
        assertThat(testSMSusers.getPoints()).isEqualTo(DEFAULT_POINTS);
        assertThat(testSMSusers.getSenderName()).isEqualTo(DEFAULT_SENDER_NAME);
        assertThat(testSMSusers.isIsActive()).isEqualTo(DEFAULT_IS_ACTIVE);
        assertThat(testSMSusers.issMPP()).isEqualTo(DEFAULT_S_MPP);
        assertThat(testSMSusers.isIsTrust()).isEqualTo(DEFAULT_IS_TRUST);
        assertThat(testSMSusers.getNotes()).isEqualTo(DEFAULT_NOTES);
        assertThat(testSMSusers.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testSMSusers.isIsMMS()).isEqualTo(DEFAULT_IS_MMS);
        assertThat(testSMSusers.isIsHTTP()).isEqualTo(DEFAULT_IS_HTTP);
        assertThat(testSMSusers.getAdminID()).isEqualTo(DEFAULT_ADMIN_ID);
    }

    @Test
    @Transactional
    public void createSMSusersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sMSusersRepository.findAll().size();

        // Create the SMSusers with an existing ID
        sMSusers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSMSusersMockMvc.perform(post("/api/sm-susers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sMSusers)))
            .andExpect(status().isBadRequest());

        // Validate the SMSusers in the database
        List<SMSusers> sMSusersList = sMSusersRepository.findAll();
        assertThat(sMSusersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSMSusers() throws Exception {
        // Initialize the database
        sMSusersRepository.saveAndFlush(sMSusers);

        // Get all the sMSusersList
        restSMSusersMockMvc.perform(get("/api/sm-susers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sMSusers.getId().intValue())))
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
    public void getSMSusers() throws Exception {
        // Initialize the database
        sMSusersRepository.saveAndFlush(sMSusers);

        // Get the sMSusers
        restSMSusersMockMvc.perform(get("/api/sm-susers/{id}", sMSusers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(sMSusers.getId().intValue()))
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
    public void getNonExistingSMSusers() throws Exception {
        // Get the sMSusers
        restSMSusersMockMvc.perform(get("/api/sm-susers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSMSusers() throws Exception {
        // Initialize the database
        sMSusersRepository.saveAndFlush(sMSusers);

        int databaseSizeBeforeUpdate = sMSusersRepository.findAll().size();

        // Update the sMSusers
        SMSusers updatedSMSusers = sMSusersRepository.findById(sMSusers.getId()).get();
        // Disconnect from session so that the updates on updatedSMSusers are not directly saved in db
        em.detach(updatedSMSusers);
        updatedSMSusers
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

        restSMSusersMockMvc.perform(put("/api/sm-susers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSMSusers)))
            .andExpect(status().isOk());

        // Validate the SMSusers in the database
        List<SMSusers> sMSusersList = sMSusersRepository.findAll();
        assertThat(sMSusersList).hasSize(databaseSizeBeforeUpdate);
        SMSusers testSMSusers = sMSusersList.get(sMSusersList.size() - 1);
        assertThat(testSMSusers.getPoints()).isEqualTo(UPDATED_POINTS);
        assertThat(testSMSusers.getSenderName()).isEqualTo(UPDATED_SENDER_NAME);
        assertThat(testSMSusers.isIsActive()).isEqualTo(UPDATED_IS_ACTIVE);
        assertThat(testSMSusers.issMPP()).isEqualTo(UPDATED_S_MPP);
        assertThat(testSMSusers.isIsTrust()).isEqualTo(UPDATED_IS_TRUST);
        assertThat(testSMSusers.getNotes()).isEqualTo(UPDATED_NOTES);
        assertThat(testSMSusers.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testSMSusers.isIsMMS()).isEqualTo(UPDATED_IS_MMS);
        assertThat(testSMSusers.isIsHTTP()).isEqualTo(UPDATED_IS_HTTP);
        assertThat(testSMSusers.getAdminID()).isEqualTo(UPDATED_ADMIN_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingSMSusers() throws Exception {
        int databaseSizeBeforeUpdate = sMSusersRepository.findAll().size();

        // Create the SMSusers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSMSusersMockMvc.perform(put("/api/sm-susers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sMSusers)))
            .andExpect(status().isBadRequest());

        // Validate the SMSusers in the database
        List<SMSusers> sMSusersList = sMSusersRepository.findAll();
        assertThat(sMSusersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSMSusers() throws Exception {
        // Initialize the database
        sMSusersRepository.saveAndFlush(sMSusers);

        int databaseSizeBeforeDelete = sMSusersRepository.findAll().size();

        // Delete the sMSusers
        restSMSusersMockMvc.perform(delete("/api/sm-susers/{id}", sMSusers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SMSusers> sMSusersList = sMSusersRepository.findAll();
        assertThat(sMSusersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SMSusers.class);
        SMSusers sMSusers1 = new SMSusers();
        sMSusers1.setId(1L);
        SMSusers sMSusers2 = new SMSusers();
        sMSusers2.setId(sMSusers1.getId());
        assertThat(sMSusers1).isEqualTo(sMSusers2);
        sMSusers2.setId(2L);
        assertThat(sMSusers1).isNotEqualTo(sMSusers2);
        sMSusers1.setId(null);
        assertThat(sMSusers1).isNotEqualTo(sMSusers2);
    }
}
