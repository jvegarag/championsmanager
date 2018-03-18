package com.jvegarag.championsmanager.repository;

import com.jvegarag.championsmanager.entity.Team;
import com.jvegarag.championsmanager.entity.Country;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

/**
 * Creates a projection to embed some data of the sub-resources
 */
//@Projection(name = "countryProjection", types = { Country.class })
interface CountryProjection {

    long getId();

    String getName();
}
