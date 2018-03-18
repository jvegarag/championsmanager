package com.jvegarag.championsmanager.repository;

import com.jvegarag.championsmanager.entity.Country;
import com.jvegarag.championsmanager.entity.Team;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

/**
 * Creates a projection to embed some data of the sub-resources
 */
@Projection(name = "teamProjection", types = { Team.class })
interface TeamProjection {

    long getId();

    String getName();

    boolean getFavorite();

    Country getCountry();

    List<Team> getOpponents();
}
