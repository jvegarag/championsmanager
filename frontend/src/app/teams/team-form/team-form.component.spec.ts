import {async, ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { TeamFavoriteComponent } from '../shared/team-favorite.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { NgArrayPipesModule } from 'angular-pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamDetailComponent } from '../team-detail/team-detail.component';
import { TeamFormComponent } from './team-form.component';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../shared/team.service';
import { HttpModule } from '@angular/http';
import { CoreModule } from '../../core/core.module';

describe('TeamFormComponent', () => {
  let component: TeamFormComponent;
  let fixture: ComponentFixture<TeamFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamFormComponent,
        TeamDetailComponent,
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
    }).compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(TeamFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
