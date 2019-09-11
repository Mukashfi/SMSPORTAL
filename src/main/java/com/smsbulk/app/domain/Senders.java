package com.smsbulk.app.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Senders.
 */
@Entity
@Table(name = "senders")
public class Senders implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "sender")
    private String sender;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getSenderId() {
        return senderId;
    }

    public Senders senderId(Long senderId) {
        this.senderId = senderId;
        return this;
    }

    public void setSenderId(Long senderId) {
        this.senderId = senderId;
    }

    public Long getUserId() {
        return userId;
    }

    public Senders userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getSender() {
        return sender;
    }

    public Senders sender(String sender) {
        this.sender = sender;
        return this;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Senders)) {
            return false;
        }
        return id != null && id.equals(((Senders) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Senders{" +
            "id=" + getId() +
            ", senderId=" + getSenderId() +
            ", userId=" + getUserId() +
            ", sender='" + getSender() + "'" +
            "}";
    }
}
