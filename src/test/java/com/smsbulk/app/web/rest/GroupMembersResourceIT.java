package com.smsbulk.app.web.rest;

import com.smsbulk.app.SmsPortalApp;
import com.smsbulk.app.domain.GroupMembers;
import com.smsbulk.app.repository.GroupMembersRepository;
import com.smsbulk.app.service.GroupMembersService;
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
 * Integration tests for the {@link GroupMembersResource} REST controller.
 */
@SpringBootTest(classes = SmsPortalApp.class)
public class GroupMembersResourceIT {

    private static final Integer DEFAULT_GOURP_ID = 1;
    private static final Integer UPDATED_GOURP_ID = 2;
    private static final Integer SMALLER_GOURP_ID = 1 - 1;

    private static final String DEFAULT_PHONE = "AAAAAAAAAA";
    private static final String UPDATED_PHONE = "BBBBBBBBBB";

    private static final Integer DEFAULT_COM_ID = 1;
    private static final Integer UPDATED_COM_ID = 2;
    private static final Integer SMALLER_COM_ID = 1 - 1;

    @Autowired
    private GroupMembersRepository groupMembersRepository;

    @Autowired
    private GroupMembersService groupMembersService;

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

    private MockMvc restGroupMembersMockMvc;

    private GroupMembers groupMembers;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GroupMembersResource groupMembersResource = new GroupMembersResource(groupMembersService);
        this.restGroupMembersMockMvc = MockMvcBuilders.standaloneSetup(groupMembersResource)
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
    public static GroupMembers createEntity(EntityManager em) {
        GroupMembers groupMembers = new GroupMembers()
            .gourpId(DEFAULT_GOURP_ID)
            .phone(DEFAULT_PHONE)
            .comId(DEFAULT_COM_ID);
        return groupMembers;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GroupMembers createUpdatedEntity(EntityManager em) {
        GroupMembers groupMembers = new GroupMembers()
            .gourpId(UPDATED_GOURP_ID)
            .phone(UPDATED_PHONE)
            .comId(UPDATED_COM_ID);
        return groupMembers;
    }

    @BeforeEach
    public void initTest() {
        groupMembers = createEntity(em);
    }

    @Test
    @Transactional
    public void createGroupMembers() throws Exception {
        int databaseSizeBeforeCreate = groupMembersRepository.findAll().size();

        // Create the GroupMembers
        restGroupMembersMockMvc.perform(post("/api/group-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupMembers)))
            .andExpect(status().isCreated());

        // Validate the GroupMembers in the database
        List<GroupMembers> groupMembersList = groupMembersRepository.findAll();
        assertThat(groupMembersList).hasSize(databaseSizeBeforeCreate + 1);
        GroupMembers testGroupMembers = groupMembersList.get(groupMembersList.size() - 1);
        assertThat(testGroupMembers.getGourpId()).isEqualTo(DEFAULT_GOURP_ID);
        assertThat(testGroupMembers.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testGroupMembers.getComId()).isEqualTo(DEFAULT_COM_ID);
    }

    @Test
    @Transactional
    public void createGroupMembersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = groupMembersRepository.findAll().size();

        // Create the GroupMembers with an existing ID
        groupMembers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGroupMembersMockMvc.perform(post("/api/group-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupMembers)))
            .andExpect(status().isBadRequest());

        // Validate the GroupMembers in the database
        List<GroupMembers> groupMembersList = groupMembersRepository.findAll();
        assertThat(groupMembersList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllGroupMembers() throws Exception {
        // Initialize the database
        groupMembersRepository.saveAndFlush(groupMembers);

        // Get all the groupMembersList
        restGroupMembersMockMvc.perform(get("/api/group-members?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(groupMembers.getId().intValue())))
            .andExpect(jsonPath("$.[*].gourpId").value(hasItem(DEFAULT_GOURP_ID)))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].comId").value(hasItem(DEFAULT_COM_ID)));
    }
    
    @Test
    @Transactional
    public void getGroupMembers() throws Exception {
        // Initialize the database
        groupMembersRepository.saveAndFlush(groupMembers);

        // Get the groupMembers
        restGroupMembersMockMvc.perform(get("/api/group-members/{id}", groupMembers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(groupMembers.getId().intValue()))
            .andExpect(jsonPath("$.gourpId").value(DEFAULT_GOURP_ID))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.comId").value(DEFAULT_COM_ID));
    }

    @Test
    @Transactional
    public void getNonExistingGroupMembers() throws Exception {
        // Get the groupMembers
        restGroupMembersMockMvc.perform(get("/api/group-members/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGroupMembers() throws Exception {
        // Initialize the database
        groupMembersService.save(groupMembers);

        int databaseSizeBeforeUpdate = groupMembersRepository.findAll().size();

        // Update the groupMembers
        GroupMembers updatedGroupMembers = groupMembersRepository.findById(groupMembers.getId()).get();
        // Disconnect from session so that the updates on updatedGroupMembers are not directly saved in db
        em.detach(updatedGroupMembers);
        updatedGroupMembers
            .gourpId(UPDATED_GOURP_ID)
            .phone(UPDATED_PHONE)
            .comId(UPDATED_COM_ID);

        restGroupMembersMockMvc.perform(put("/api/group-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedGroupMembers)))
            .andExpect(status().isOk());

        // Validate the GroupMembers in the database
        List<GroupMembers> groupMembersList = groupMembersRepository.findAll();
        assertThat(groupMembersList).hasSize(databaseSizeBeforeUpdate);
        GroupMembers testGroupMembers = groupMembersList.get(groupMembersList.size() - 1);
        assertThat(testGroupMembers.getGourpId()).isEqualTo(UPDATED_GOURP_ID);
        assertThat(testGroupMembers.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testGroupMembers.getComId()).isEqualTo(UPDATED_COM_ID);
    }

    @Test
    @Transactional
    public void updateNonExistingGroupMembers() throws Exception {
        int databaseSizeBeforeUpdate = groupMembersRepository.findAll().size();

        // Create the GroupMembers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGroupMembersMockMvc.perform(put("/api/group-members")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(groupMembers)))
            .andExpect(status().isBadRequest());

        // Validate the GroupMembers in the database
        List<GroupMembers> groupMembersList = groupMembersRepository.findAll();
        assertThat(groupMembersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGroupMembers() throws Exception {
        // Initialize the database
        groupMembersService.save(groupMembers);

        int databaseSizeBeforeDelete = groupMembersRepository.findAll().size();

        // Delete the groupMembers
        restGroupMembersMockMvc.perform(delete("/api/group-members/{id}", groupMembers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<GroupMembers> groupMembersList = groupMembersRepository.findAll();
        assertThat(groupMembersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GroupMembers.class);
        GroupMembers groupMembers1 = new GroupMembers();
        groupMembers1.setId(1L);
        GroupMembers groupMembers2 = new GroupMembers();
        groupMembers2.setId(groupMembers1.getId());
        assertThat(groupMembers1).isEqualTo(groupMembers2);
        groupMembers2.setId(2L);
        assertThat(groupMembers1).isNotEqualTo(groupMembers2);
        groupMembers1.setId(null);
        assertThat(groupMembers1).isNotEqualTo(groupMembers2);
    }
}
