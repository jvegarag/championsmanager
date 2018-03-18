import { Component } from '@angular/core';

@Component({
  selector: 'cmp-team-root',
  styleUrls: ['./app.component.css'],
  template: `
    <div class="main-app container">
      <div class="row">
        <h1 class="title">{{ title }}</h1>
      </div>
      <cmp-core-error-message></cmp-core-error-message>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  title = 'UEFA Champions Manager';
  author = 'Joaquín Vegara García';
}
