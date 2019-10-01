package com.smsbulk.app.service.mapper;

import com.smsbulk.app.domain.*;
import com.smsbulk.app.service.dto.GroupsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Groups} and its DTO {@link GroupsDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface GroupsMapper extends EntityMapper<GroupsDTO, Groups> {



    default Groups fromId(Long id) {
        if (id == null) {
            return null;
        }
        Groups groups = new Groups();
        groups.setId(id);
        return groups;
    }
}
