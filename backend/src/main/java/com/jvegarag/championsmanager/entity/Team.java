package com.jvegarag.championsmanager.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name="TEAM")
public class Team {

    private static final int MIN_LENGTH_NAME = 4;
    private static final int MAX_LENGTH_NAME = 24;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(nullable = false)
    @Size(min = MIN_LENGTH_NAME, max = MAX_LENGTH_NAME)
    @NotNull
    private String name;

    @ManyToMany
    @JoinTable(name="TEAM_OPPONENT_REL", joinColumns=@JoinColumn(name="TEAM_ID"), inverseJoinColumns = @JoinColumn(name="OPPONENT_ID"))
    private List<Team> opponents;

    @OneToOne
    @JoinColumn(name="COUNTRY_ID")
    private Country country;

    private Boolean favorite = false;

    public Boolean getFavorite() {
        return favorite;
    }

    public void setFavorite(Boolean favorite) {
        this.favorite = favorite;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Team> getOpponents() {
        return opponents;
    }

    public void setOpponents(List<Team> opponents) {
        this.opponents = opponents;
    }

    public Country getCountry() {
        return country;
    }

    public void setCountry(Country country) {
        this.country = country;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Team team = (Team) o;

        return id == team.id;
    }

    @Override
    public int hashCode() {
        return (int) (id ^ (id >>> 32));
    }
}
