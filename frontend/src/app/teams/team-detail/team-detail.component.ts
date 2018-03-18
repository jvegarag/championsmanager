import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Team } from '../shared/team.model';
import { TeamService } from '../shared/team.service';

@Component({
  selector: 'cmp-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  team: Team;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.loadTeam(id);
    });
  }

  loadTeam(id: number): void {
    this.teamService.getTeam(id)
      .subscribe(data => {
        this.team = data;
      });
  }

}
