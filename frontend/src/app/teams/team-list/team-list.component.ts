import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { PluckPipe } from 'angular-pipes/src/array/pluck.pipe';
import { JoinPipe } from 'angular-pipes/src/array/join.pipe';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { Team } from '../shared/team.model';
import { Filter } from './filter.model';
import { TeamService } from '../shared/team.service';
import { PaginatedList } from '../shared/paginated-list.model';


@Component({
  selector: 'cmp-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: [ './team-list.component.css']
})
export class TeamListComponent implements OnInit {

  teamPage: PaginatedList;
  currentFilter: Filter = new Filter('', '');

  private searchTerms = new ReplaySubject<Filter>();

  constructor(
    private teamService: TeamService) { }

  filter(): void {
    this.searchTerms.next(new Filter(this.currentFilter.name, this.currentFilter.countryName));
  }

  ngOnInit(): void {
    this.searchTerms
        .debounceTime(300)
        .distinctUntilChanged()
        .switchMap(filters =>
            this.teamService.getFilteredTeams(filters.name, filters.countryName))
        .subscribe(
            page => { this.teamPage = page; },
            err =>  this.teamService.handleError(err)
        );

    this.filter();
  }

  prevPage(): void {
    this.teamService.getPage(this.teamPage.links.previous)
      .subscribe(
        page => { this.teamPage = page; },
        err =>  this.teamService.handleError(err)
      );
  }

  nextPage(): void {
    this.teamService.getPage(this.teamPage.links.next)
            .subscribe(
              page => { this.teamPage = page; },
              err =>  this.teamService.handleError(err)
            );
  }

  delete(team: Team): void {
    this.teamService.deleteTeam(team)
      .subscribe(
          data => this.filter(),
          err => this.teamService.handleError(err)
      );
  }

  clearFilters(): void {
    this.currentFilter.clear();
    this.filter();
  }

}
