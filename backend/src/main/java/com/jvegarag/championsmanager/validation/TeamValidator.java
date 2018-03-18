package com.jvegarag.championsmanager.validation;

import com.jvegarag.championsmanager.entity.Team;
import com.jvegarag.championsmanager.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * This class contains the validations to perform when creating and updating a team
 */
@Component
public class TeamValidator implements Validator {

    @Autowired
    TeamRepository teamRepository;

    @Value("${team.validation.favorites.max}")
    private int maxFavorites;

    @Value("${team.validation.name.maxWords}")
    private int maxWordsInName;

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public boolean supports(Class<?> aClass) {
        return Team.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Team team = (Team) o;

        // To prevent the retrieval of the cached version before persisting
        entityManager.detach(team);

        checkName(team, errors);
        checkFavorites(team, errors);
    }

    /**
     * The name should contain only one word
     * @param t
     * @param errors
     */
    private void checkName(Team t, Errors errors) {
        if (t.getName()!=null && t.getName().trim().split(" ").length > maxWordsInName) {
            errors.reject("team.name.onlyoneword");
        }
    }

    /**
     * The maximum number of favorites should be 5
     * @param errors
     */
    private void checkFavorites(Team t, Errors errors) {

        boolean newFavorite = false;
        if (teamRepository.exists(t.getId())){
            Team currentData = teamRepository.findOne(t.getId());
            newFavorite = Boolean.FALSE.equals(currentData.getFavorite()) && Boolean.TRUE.equals(t.getFavorite());
        }
        else {
            newFavorite = t.getFavorite();
        }

        if (newFavorite) {
            int total = teamRepository.countByFavorite();
            if (total >= maxFavorites) {
                errors.reject("team.favorites.toomany", new Object[]{maxFavorites}, "Maximum number of favorites reached");
            }
        }
    }

}
