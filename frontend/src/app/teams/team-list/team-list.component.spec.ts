import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamListComponent } from './team-list.component';

import { NgArrayPipesModule } from 'angular-pipes';
import { RouterTestingModule } from '@angular/router/testing';
import { TeamDetailComponent } from '../team-detail/team-detail.component';
import { TeamFormComponent } from '../team-form/team-form.component';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../shared/team.service';
import { HttpModule } from '@angular/http';
import { CoreModule } from '../../core/core.module';
import { TeamFavoriteComponent } from '../shared/team-favorite.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeamListComponent,
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
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
