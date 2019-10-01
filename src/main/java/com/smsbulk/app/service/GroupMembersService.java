package com.smsbulk.app.service;

import com.smsbulk.app.domain.GroupMembers;
import com.smsbulk.app.repository.GroupMembersRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link GroupMembers}.
 */
@Service
@Transactional
public class GroupMembersService {

    private final Logger log = LoggerFactory.getLogger(GroupMembersService.class);

    private final GroupMembersRepository groupMembersRepository;

    public GroupMembersService(GroupMembersRepository groupMembersRepository) {
        this.groupMembersRepository = groupMembersRepository;
    }

    /**
     * Save a groupMembers.
     *
     * @param groupMembers the entity to save.
     * @return the persisted entity.
     */
    public GroupMembers save(GroupMembers groupMembers) {
        log.debug("Request to save GroupMembers : {}", groupMembers);
        return groupMembersRepository.save(groupMembers);
    }

    /**
     * Get all the groupMembers.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<GroupMembers> findAll(Pageable pageable) {
        log.debug("Request to get all GroupMembers");
        return groupMembersRepository.findAll(pageable);
    }


    /**
     * Get one groupMembers by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<GroupMembers> findOne(Long id) {
        log.debug("Request to get GroupMembers : {}", id);
        return groupMembersRepository.findById(id);
    }

    /**
     * Delete the groupMembers by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete GroupMembers : {}", id);
        groupMembersRepository.deleteById(id);
    }
}
