package com.jvegarag.championsmanager.repository;

import com.jvegarag.championsmanager.entity.Country;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

/**
 * Country resource definition
 */
@RepositoryRestResource(path = "country")
public interface CountryRepository extends CrudRepository<Country, Long> {

    // Prevents POST /country and PUT/PATCH /country/:id
    @Override
    @RestResource(exported = false)
    Country save(Country type);

    // Prevents DELETE /country/:id
    @Override
    @RestResource(exported = false)
    void delete(Country type);
}

