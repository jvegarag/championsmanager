import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Team } from './team.model';
import { Country } from './country.model';

import { ErrorService } from '../../core/error.service';
import { Error } from '../../core/error.model';

import { PaginatedList } from './paginated-list.model';
import { Links } from './paginated-list.model';

@Injectable()
export class TeamService {

  readonly teamResourceUrl = 'api/team';
  readonly countryResourceUrl = 'api/country';

  constructor(
    private http: Http,
    private errorService: ErrorService) {

  }

  getFilteredTeams(name: string, countryName: string, size: number): Observable<PaginatedList> {
    const url = `${this.teamResourceUrl}/search/findByCriteria?size=${size}&name=${name}&countryName=${countryName}`;
    return this.http.get(url)
                    .map(response => this.buildPaginatedResponse(response));
  }

  getPage(url: string) {
    return this.http.get(url)
                    .map(response => this.buildPaginatedResponse(response));
  }

  buildPaginatedResponse(res: Response): PaginatedList {
    const json = res.json();
    const page = new PaginatedList();
    page.list = json._embedded.teams;
    page.links = new Links();
    page.links.next = json._links.next ? json._links.next.href : null;
    page.links.previous = json._links.prev ? json._links.prev.href : null;
    page.page = json.page;
    return page;
  }

  toggleFavorite(team: Team): Observable<Team> {
    const url = `${this.teamResourceUrl}/${team.id}`;
    const data = { favorite: !team.favorite };
    return this.http.patch(url, data)
                    .map((res: Response) => res.json() as Team);
  }

  getTeam(id: number): Observable<Team> {
    const url = `${this.teamResourceUrl}/${id}?projection=teamProjection`;
    return this.http.get(url)
                    .map(res => res.json());
  }

  getCountries(): Observable<Country[]> {
    const url = this.countryResourceUrl;
    return this.http.get(url)
                    .map(res => res.json()._embedded.countries as Country[]);
  }

  getAllTeams(): Observable<Team[]> {
    const url = this.teamResourceUrl;
    return this.http.get(url)
                    .map(res => res.json()._embedded.teams as Team[]);
  }

  createTeam(team: Team, opponents: number[], country: number): Observable<Team> {
    const createRequest = this.buildUpdateRequest(team, opponents, country);
    const url = this.teamResourceUrl;
    return this.http.post(url, createRequest)
                    .map((res: Response) => res.json() as Team);
  }

  deleteTeam(team: Team): Observable<Response> {
    const url = `${this.teamResourceUrl}/${team.id}`;
    return this.http.delete(url);
  }

  updateTeam(team: Team, opponents: number[], country: number): Observable<Team> {
    const updateRequest = this.buildUpdateRequest(team, opponents, country);
    const url = `${this.teamResourceUrl}/${team.id}`;
    return this.http.patch(url, updateRequest)
                    .map((res: Response) => res.json() as Team);
  }

  buildUpdateRequest(t: Team, opponents: number[], country: number): any {
    const team = {
      name : t.name,
      favorite : t.favorite,
      opponents : opponents.map(id => `${this.teamResourceUrl}/${id}`),
      country : `${this.countryResourceUrl}/${country}`
    };
    return team;
  }

  handleError(err: any): void {
    let error: Error;
    try {
      error = JSON.parse(err._body) as Error;
    } catch (e) {
      if (typeof err._body === 'string') {
        error = new Error(err._body);
      } else {
        error = new Error('Unexpected error');
      }
    }
    this.errorService.sendError(error);
  }

}
