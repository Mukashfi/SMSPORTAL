package com.smsbulk.app.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A SMSusers.
 */
@Entity
@Table(name = "sm_susers")
public class SMSusers implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "points")
    private Long points;

    @Column(name = "sender_name")
    private String senderName;

    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "s_mpp")
    private Boolean sMPP;

    @Column(name = "is_trust")
    private Boolean isTrust;

    @Column(name = "notes")
    private String notes;

    @Column(name = "phone")
    private String phone;

    @Column(name = "is_mms")
    private Boolean isMMS;

    @Column(name = "is_http")
    private Boolean isHTTP;

    @Column(name = "admin_id")
    private Long adminID;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getPoints() {
        return points;
    }

    public SMSusers points(Long points) {
        this.points = points;
        return this;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    public String getSenderName() {
        return senderName;
    }

    public SMSusers senderName(String senderName) {
        this.senderName = senderName;
        return this;
    }

    public void setSenderName(String senderName) {
        this.senderName = senderName;
    }

    public Boolean isIsActive() {
        return isActive;
    }

    public SMSusers isActive(Boolean isActive) {
        this.isActive = isActive;
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Boolean issMPP() {
        return sMPP;
    }

    public SMSusers sMPP(Boolean sMPP) {
        this.sMPP = sMPP;
        return this;
    }

    public void setsMPP(Boolean sMPP) {
        this.sMPP = sMPP;
    }

    public Boolean isIsTrust() {
        return isTrust;
    }

    public SMSusers isTrust(Boolean isTrust) {
        this.isTrust = isTrust;
        return this;
    }

    public void setIsTrust(Boolean isTrust) {
        this.isTrust = isTrust;
    }

    public String getNotes() {
        return notes;
    }

    public SMSusers notes(String notes) {
        this.notes = notes;
        return this;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getPhone() {
        return phone;
    }

    public SMSusers phone(String phone) {
        this.phone = phone;
        return this;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Boolean isIsMMS() {
        return isMMS;
    }

    public SMSusers isMMS(Boolean isMMS) {
        this.isMMS = isMMS;
        return this;
    }

    public void setIsMMS(Boolean isMMS) {
        this.isMMS = isMMS;
    }

    public Boolean isIsHTTP() {
        return isHTTP;
    }

    public SMSusers isHTTP(Boolean isHTTP) {
        this.isHTTP = isHTTP;
        return this;
    }

    public void setIsHTTP(Boolean isHTTP) {
        this.isHTTP = isHTTP;
    }

    public Long getAdminID() {
        return adminID;
    }

    public SMSusers adminID(Long adminID) {
        this.adminID = adminID;
        return this;
    }

    public void setAdminID(Long adminID) {
        this.adminID = adminID;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SMSusers)) {
            return false;
        }
        return id != null && id.equals(((SMSusers) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "SMSusers{" +
            "id=" + getId() +
            ", points=" + getPoints() +
            ", senderName='" + getSenderName() + "'" +
            ", isActive='" + isIsActive() + "'" +
            ", sMPP='" + issMPP() + "'" +
            ", isTrust='" + isIsTrust() + "'" +
            ", notes='" + getNotes() + "'" +
            ", phone='" + getPhone() + "'" +
            ", isMMS='" + isIsMMS() + "'" +
            ", isHTTP='" + isIsHTTP() + "'" +
            ", adminID=" + getAdminID() +
            "}";
    }
}
