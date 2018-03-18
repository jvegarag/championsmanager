import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamDetailComponent } from './team-detail.component';
import { TeamFavoriteComponent } from '../shared/team-favorite.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { NgArrayPipesModule } from 'angular-pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamFormComponent } from '../team-form/team-form.component';
import { FormsModule } from '@angular/forms';
import {TeamService} from '../shared/team.service';
import {HttpModule} from '@angular/http';
import {CoreModule} from '../../core/core.module';

describe('TeamDetailComponent', () => {
  let component: TeamDetailComponent;
  let fixture: ComponentFixture<TeamDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamDetailComponent,
        TeamFormComponent,
        TeamFavoriteComponent
      ],
      imports : [
        FormsModule,
        MultiselectDropdownModule,
        HttpModule,
        NgArrayPipesModule,
        CoreModule.forRoot(),
        RouterTestingModule.withRoutes([
          { path: 'teams/edit/:id', component: TeamFormComponent }
        ])
      ],
      providers: [ TeamService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
