package com.smsbulk.app.web.rest;

import com.smsbulk.app.SmsPortalApp;
import com.smsbulk.app.domain.Senders;
import com.smsbulk.app.repository.SendersRepository;
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
 * Integration tests for the {@link SendersResource} REST controller.
 */
@SpringBootTest(classes = SmsPortalApp.class)
public class SendersResourceIT {

    private static final Long DEFAULT_SENDER_ID = 1L;
    private static final Long UPDATED_SENDER_ID = 2L;
    private static final Long SMALLER_SENDER_ID = 1L - 1L;

    private static final Long DEFAULT_USER_ID = 1L;
    private static final Long UPDATED_USER_ID = 2L;
    private static final Long SMALLER_USER_ID = 1L - 1L;

    private static final String DEFAULT_SENDER = "AAAAAAAAAA";
    private static final String UPDATED_SENDER = "BBBBBBBBBB";

    @Autowired
    private SendersRepository sendersRepository;

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

    private MockMvc restSendersMockMvc;

    private Senders senders;
    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SendersResource sendersResource = new SendersResource(sendersRepository,null);
        this.restSendersMockMvc = MockMvcBuilders.standaloneSetup(sendersResource)
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
    public static Senders createEntity(EntityManager em) {
        Senders senders = new Senders()
            .senderId(DEFAULT_SENDER_ID)
            .userId(DEFAULT_USER_ID)
            .sender(DEFAULT_SENDER);
        return senders;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Senders createUpdatedEntity(EntityManager em) {
        Senders senders = new Senders()
            .senderId(UPDATED_SENDER_ID)
            .userId(UPDATED_USER_ID)
            .sender(UPDATED_SENDER);
        return senders;
    }

    @BeforeEach
    public void initTest() {
        senders = createEntity(em);
    }

    @Test
    @Transactional
    public void createSenders() throws Exception {
        int databaseSizeBeforeCreate = sendersRepository.findAll().size();

        // Create the Senders
        restSendersMockMvc.perform(post("/api/senders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(senders)))
            .andExpect(status().isCreated());

        // Validate the Senders in the database
        List<Senders> sendersList = sendersRepository.findAll();
        assertThat(sendersList).hasSize(databaseSizeBeforeCreate + 1);
        Senders testSenders = sendersList.get(sendersList.size() - 1);
        assertThat(testSenders.getSenderId()).isEqualTo(DEFAULT_SENDER_ID);
        assertThat(testSenders.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testSenders.getSender()).isEqualTo(DEFAULT_SENDER);
    }

    @Test
    @Transactional
    public void createSendersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sendersRepository.findAll().size();

        // Create the Senders with an existing ID
        senders.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSendersMockMvc.perform(post("/api/senders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(senders)))
            .andExpect(status().isBadRequest());

        // Validate the Senders in the database
        List<Senders> sendersList = sendersRepository.findAll();
        assertThat(sendersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllSenders() throws Exception {
        // Initialize the database
        sendersRepository.saveAndFlush(senders);

        // Get all the sendersList
        restSendersMockMvc.perform(get("/api/senders?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(senders.getId().intValue())))
            .andExpect(jsonPath("$.[*].senderId").value(hasItem(DEFAULT_SENDER_ID.intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.intValue())))
            .andExpect(jsonPath("$.[*].sender").value(hasItem(DEFAULT_SENDER.toString())));
    }
    
    @Test
    @Transactional
    public void getSenders() throws Exception {
        // Initialize the database
        sendersRepository.saveAndFlush(senders);

        // Get the senders
        restSendersMockMvc.perform(get("/api/senders/{id}", senders.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(senders.getId().intValue()))
            .andExpect(jsonPath("$.senderId").value(DEFAULT_SENDER_ID.intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.intValue()))
            .andExpect(jsonPath("$.sender").value(DEFAULT_SENDER.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingSenders() throws Exception {
        // Get the senders
        restSendersMockMvc.perform(get("/api/senders/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSenders() throws Exception {
        // Initialize the database
        sendersRepository.saveAndFlush(senders);

        int databaseSizeBeforeUpdate = sendersRepository.findAll().size();

        // Update the senders
        Senders updatedSenders = sendersRepository.findById(senders.getId()).get();
        // Disconnect from session so that the updates on updatedSenders are not directly saved in db
        em.detach(updatedSenders);
        updatedSenders
            .senderId(UPDATED_SENDER_ID)
            .userId(UPDATED_USER_ID)
            .sender(UPDATED_SENDER);

        restSendersMockMvc.perform(put("/api/senders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedSenders)))
            .andExpect(status().isOk());

        // Validate the Senders in the database
        List<Senders> sendersList = sendersRepository.findAll();
        assertThat(sendersList).hasSize(databaseSizeBeforeUpdate);
        Senders testSenders = sendersList.get(sendersList.size() - 1);
        assertThat(testSenders.getSenderId()).isEqualTo(UPDATED_SENDER_ID);
        assertThat(testSenders.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testSenders.getSender()).isEqualTo(UPDATED_SENDER);
    }

    @Test
    @Transactional
    public void updateNonExistingSenders() throws Exception {
        int databaseSizeBeforeUpdate = sendersRepository.findAll().size();

        // Create the Senders

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSendersMockMvc.perform(put("/api/senders")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(senders)))
            .andExpect(status().isBadRequest());

        // Validate the Senders in the database
        List<Senders> sendersList = sendersRepository.findAll();
        assertThat(sendersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSenders() throws Exception {
        // Initialize the database
        sendersRepository.saveAndFlush(senders);

        int databaseSizeBeforeDelete = sendersRepository.findAll().size();

        // Delete the senders
        restSendersMockMvc.perform(delete("/api/senders/{id}", senders.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Senders> sendersList = sendersRepository.findAll();
        assertThat(sendersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Senders.class);
        Senders senders1 = new Senders();
        senders1.setId(1L);
        Senders senders2 = new Senders();
        senders2.setId(senders1.getId());
        assertThat(senders1).isEqualTo(senders2);
        senders2.setId(2L);
        assertThat(senders1).isNotEqualTo(senders2);
        senders1.setId(null);
        assertThat(senders1).isNotEqualTo(senders2);
    }
}
