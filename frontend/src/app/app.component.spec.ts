import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamFormComponent } from './teams/team-form/team-form.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';
import { TeamFavoriteComponent } from './teams/shared/team-favorite.component';

import { NgArrayPipesModule } from 'angular-pipes';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { InputTrimDirective } from 'ng2-trim-directive/dist/input-trim.directive';

import {CoreModule} from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TeamListComponent,
        TeamFormComponent,
        TeamDetailComponent,
        TeamFavoriteComponent,
        InputTrimDirective
      ],
      imports: [
        FormsModule,
        AppRoutingModule,
        NgArrayPipesModule,
        MultiselectDropdownModule,
        CoreModule.forRoot()
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('UEFA Champions Manager');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('UEFA Champions Manager');
  }));
});
