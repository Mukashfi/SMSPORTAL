package com.smsbulk.app.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A SubUsers.
 */
@Entity
@Table(name = "sub_users")
public class SubUsers implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "username")
    private String username;

    @Column(name = "parent_user_id")
    private Long parentUserId;

    @Column(name = "is_authrized")
    private Boolean isAuthrized;

    @Column(name = "sub_user_id")
    private Long subUserId;

    @Column(name = "user_id")
    private Long userId;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public SubUsers username(String username) {
        this.username = username;
        return this;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getParentUserId() {
        return parentUserId;
    }

    public SubUsers parentUserId(Long parentUserId) {
        this.parentUserId = parentUserId;
        return this;
    }

    public void setParentUserId(Long parentUserId) {
        this.parentUserId = parentUserId;
    }

    public Boolean isIsAuthrized() {
        return isAuthrized;
    }

    public SubUsers isAuthrized(Boolean isAuthrized) {
        this.isAuthrized = isAuthrized;
        return this;
    }

    public void setIsAuthrized(Boolean isAuthrized) {
        this.isAuthrized = isAuthrized;
    }

    public Long getSubUserId() {
        return subUserId;
    }

    public SubUsers subUserId(Long subUserId) {
        this.subUserId = subUserId;
        return this;
    }

    public void setSubUserId(Long subUserId) {
        this.subUserId = subUserId;
    }

    public Long getUserId() {
        return userId;
    }

    public SubUsers userId(Long userId) {
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
        if (!(o instanceof SubUsers)) {
            return false;
        }
        return id != null && id.equals(((SubUsers) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SubUsers{" +
            "id=" + getId() +
            ", username='" + getUsername() + "'" +
            ", parentUserId=" + getParentUserId() +
            ", isAuthrized='" + isIsAuthrized() + "'" +
            ", subUserId=" + getSubUserId() +
            ", userId=" + getUserId() +
            "}";
    }
}
