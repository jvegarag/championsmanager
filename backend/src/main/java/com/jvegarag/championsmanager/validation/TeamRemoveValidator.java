package com.jvegarag.championsmanager.validation;

import com.jvegarag.championsmanager.entity.Team;
import com.jvegarag.championsmanager.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

import java.util.List;

/**
 * This class contains the validations to perform when removing a team
 */
@Component
public class TeamRemoveValidator implements Validator {

    @Autowired
    TeamRepository teamRepository;


    @Override
    public boolean supports(Class<?> aClass) {
        return Team.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        Team team = (Team) o;
        checkIntegrity(team, errors);
    }

    /**
     * Checks the integrity of the team list before deleting a team
     * @param team
     * @param errors
     */
    private void checkIntegrity(Team team, Errors errors) {
        List<Team> teamList = teamRepository.findByOpponentId(team.getId());
        if (teamList.size()>0) {
            errors.reject("team.integrity.cannotdelete");
        }
    }

}
