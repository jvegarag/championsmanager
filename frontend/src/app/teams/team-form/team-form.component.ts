import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Team } from '../shared/team.model';
import { TeamService } from '../shared/team.service';
import { Country } from '../shared/country.model';

@Component({
  selector: 'cmp-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.css']
})
export class TeamFormComponent implements OnInit {

  team: Team;

  private formType = 'create';

  countryList = [];
  countryListSelected: number[] = [];

  opponentList = [];
  opponentListSelected: number[] = [];

  msOpponentListSettings = {
    enableSearch: true,
    dynamicTitleMaxItems: 2,
    itemClasses: 'ss-item',
    buttonClasses: 'btn btn-outline-info'
  };

  msCountryListSettings = {
    enableSearch: true,
    selectionLimit: 1,
    autoUnselect: true,
    itemClasses: 'ss-item',
    buttonClasses: 'btn btn-outline-info'
  };

  constructor(
    private router: Router,
    private actRouter: ActivatedRoute,
    private teamService: TeamService) { }


  ngOnInit() {
    this.loadAllCountries();
    this.loadAllTeams();

    this.actRouter.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.formType = 'edit';
        this.loadTeam(id);
      } else {
        this.team = new Team();
      }
    });
  }

  loadTeam(id: number): void {
    this.teamService.getTeam(id)
      .subscribe(data => {
         this.team = data;
         this.opponentListSelected = data.opponents.map(v => v.id);
         this.countryListSelected = data.country ? [data.country.id] : [];
      });
  }

  loadAllTeams(): void {
    this.teamService.getAllTeams()
      .subscribe(
          data => { this.opponentList = data.map(v => ({id: v.id, name: v.name})); },
          err => this.teamService.handleError(err)
      );
  }

  loadAllCountries(): void {
    this.teamService.getCountries()
      .subscribe(
          data => { this.countryList = data.map(v => ({id: v.id, name: v.name})); },
          err => this.teamService.handleError(err)
      );
  }

  onSubmit(): void {
    this.formType === 'create'
      ? this.createTeam()
      : this.updateTeam();
  }

  createTeam(): void {
    this.teamService.createTeam(this.team, this.opponentListSelected, this.countryListSelected[0])
      .subscribe(
        data => this.router.navigate(['teams']),
        err => this.teamService.handleError(err)
      );
  }

  updateTeam(): void {
    this.teamService.updateTeam(this.team, this.opponentListSelected, this.countryListSelected[0])
      .subscribe(
        data => this.router.navigate(['teams']),
        err => this.teamService.handleError(err)
      );
  }

}
