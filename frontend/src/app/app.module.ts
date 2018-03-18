import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgArrayPipesModule } from 'angular-pipes';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { InputTrimDirective } from 'ng2-trim-directive/dist/input-trim.directive';

import { AppComponent } from './app.component';
import { TeamListComponent } from './teams/team-list/team-list.component';
import { TeamFormComponent } from './teams/team-form/team-form.component';
import { TeamDetailComponent } from './teams/team-detail/team-detail.component';
import { TeamFavoriteComponent } from './teams/shared/team-favorite.component';

import { TeamService } from './teams/shared/team.service';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    TeamListComponent,
    TeamFormComponent,
    TeamDetailComponent,
    TeamFavoriteComponent,
    InputTrimDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgArrayPipesModule,
    MultiselectDropdownModule,
    CoreModule.forRoot()
  ],
  exports: [ AppComponent ],
  entryComponents: [ AppComponent ],
  bootstrap: [ AppComponent ],
  providers: [ TeamService ]
})
export class AppModule { }
