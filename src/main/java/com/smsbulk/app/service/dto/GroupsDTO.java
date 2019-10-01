package com.smsbulk.app.service.dto;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link com.smsbulk.app.domain.Groups} entity.
 */
public class GroupsDTO implements Serializable {

    private Long id;

    private Integer groupId;

    private String groupname;

    private String groupdesc;

    private Long userId;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getGroupname() {
        return groupname;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public String getGroupdesc() {
        return groupdesc;
    }

    public void setGroupdesc(String groupdesc) {
        this.groupdesc = groupdesc;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GroupsDTO groupsDTO = (GroupsDTO) o;
        if (groupsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), groupsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GroupsDTO{" +
            "id=" + getId() +
            ", groupId=" + getGroupId() +
            ", groupname='" + getGroupname() + "'" +
            ", groupdesc='" + getGroupdesc() + "'" +
            ", userId=" + getUserId() +
            "}";
    }
}
