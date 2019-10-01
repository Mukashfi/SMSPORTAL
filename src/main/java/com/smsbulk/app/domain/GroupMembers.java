package com.smsbulk.app.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A GroupMembers.
 */
@Entity
@Table(name = "group_members")
public class GroupMembers implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "gourp_id")
    private Integer gourpId;

    @Column(name = "phone")
    private String phone;

    @Column(name = "com_id")
    private Integer comId;

    @ManyToOne
    private Groups gourpmem;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getGourpId() {
        return gourpId;
    }

    public GroupMembers gourpId(Integer gourpId) {
        this.gourpId = gourpId;
        return this;
    }

    public void setGourpId(Integer gourpId) {
        this.gourpId = gourpId;
    }

    public String getPhone() {
        return phone;
    }

    public GroupMembers phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Integer getComId() {
        return comId;
    }

    public GroupMembers comId(Integer comId) {
        this.comId = comId;
        return this;
    }

    public void setComId(Integer comId) {
        this.comId = comId;
    }

    public Groups getGourpmem() {
        return gourpmem;
    }

    public GroupMembers gourpmem(Groups groups) {
        this.gourpmem = groups;
        return this;
    }

    public void setGourpmem(Groups groups) {
        this.gourpmem = groups;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof GroupMembers)) {
            return false;
        }
        return id != null && id.equals(((GroupMembers) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "GroupMembers{" +
            "id=" + getId() +
            ", gourpId=" + getGourpId() +
            ", phone='" + getPhone() + "'" +
            ", comId=" + getComId() +
            "}";
    }
}
