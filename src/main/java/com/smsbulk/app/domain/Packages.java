package com.smsbulk.app.domain;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Packages.
 */
@Entity
@Table(name = "packages")
public class Packages implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "points")
    private Long points;

    @Column(name = "price")
    private Long price;

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

    public Packages points(Long points) {
        this.points = points;
        return this;
    }

    public void setPoints(Long points) {
        this.points = points;
    }

    public Long getPrice() {
        return price;
    }

    public Packages price(Long price) {
        this.price = price;
        return this;
    }

    public void setPrice(Long price) {
        this.price = price;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Packages)) {
            return false;
        }
        return id != null && id.equals(((Packages) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Packages{" +
            "id=" + getId() +
            ", points=" + getPoints() +
            ", price=" + getPrice() +
            "}";
    }
}
