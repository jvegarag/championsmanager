import { Component, Input } from '@angular/core';

import { Team } from './team.model';
import { TeamService } from './team.service';

@Component({
  selector: 'cmp-team-favorite',
  template: `<img src="assets/img/star_{{team.favorite}}.png" (click)="toggleFavorite(team); $event.stopPropagation()"/>`,
  styles: [
    `
      img { cursor: pointer; }
    `
  ]
})
export class TeamFavoriteComponent {

  @Input() team: Team;

  constructor(
    private teamService: TeamService) {
  }

  toggleFavorite(team: Team): void {
    this.teamService.toggleFavorite(team)
        .subscribe(
          data => { team.favorite = data.favorite; },
          err => this.teamService.handleError(err)
        );
  }
}

