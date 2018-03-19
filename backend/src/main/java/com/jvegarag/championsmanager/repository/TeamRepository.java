package com.jvegarag.championsmanager.repository;

import com.jvegarag.championsmanager.entity.Team;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(path = "team", excerptProjection = TeamProjection.class)
public interface TeamRepository extends PagingAndSortingRepository<Team, Long> {

    /**
     * Retrieves a list of Teams filtered by the criteria parameters
     * @param name The name criteria to be applied
     * @param page Pagination options
     * @return
     */
    @Query("select t from Team t where (upper(t.name) like upper(concat('%', :name,'%')) or :name is null) " +
           "and (upper(t.country.name) like upper(concat('%', :countryName,'%')) or :countryName is null)")
    Page<Team> findByCriteria(@Param("name") String name, @Param("countryName") String countryName, Pageable page);

    @Query("select count(t) from Team t where t.favorite = 1")
    int countByFavorite();

    @RestResource(exported = false)
    @Query("select distinct t from Team t join t.opponents o where o.id=:id")
    List<Team> findByOpponentId(@Param("id") long id);
}




