import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamFormComponent } from './teams/team-form/team-form.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';
import {APP_BASE_HREF} from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: '/teams', pathMatch: 'full' },
  { path: 'teams', component: TeamListComponent },
  { path: 'teams/detail/:id', component: TeamDetailComponent },
  { path: 'teams/edit/:id', component: TeamFormComponent },
  { path: 'teams/create', component: TeamFormComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ {provide: APP_BASE_HREF, useValue : '/' } ]
})
export class AppRoutingModule {}
