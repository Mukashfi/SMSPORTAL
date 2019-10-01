package com.smsbulk.app.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Groups.
 */
@Entity
@Table(name = "groups")
public class Groups implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "group_id")
    private Integer groupId;

    @Column(name = "groupname")
    private String groupname;

    @Column(name = "groupdesc")
    private String groupdesc;

    @Column(name = "user_id")
    private Long userId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGroupId() {
        return groupId;
    }

    public Groups groupId(Integer groupId) {
        this.groupId = groupId;
        return this;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }

    public String getGroupname() {
        return groupname;
    }

    public Groups groupname(String groupname) {
        this.groupname = groupname;
        return this;
    }

    public void setGroupname(String groupname) {
        this.groupname = groupname;
    }

    public String getGroupdesc() {
        return groupdesc;
    }

    public Groups groupdesc(String groupdesc) {
        this.groupdesc = groupdesc;
        return this;
    }

    public void setGroupdesc(String groupdesc) {
        this.groupdesc = groupdesc;
    }

    public Long getUserId() {
        return userId;
    }

    public Groups userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Groups)) {
            return false;
        }
        return id != null && id.equals(((Groups) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Groups{" +
            "id=" + getId() +
            ", groupId=" + getGroupId() +
            ", groupname='" + getGroupname() + "'" +
            ", groupdesc='" + getGroupdesc() + "'" +
            ", userId=" + getUserId() +
            "}";
    }
}
