import {CUSTOM_ELEMENTS_SCHEMA, NgModule, Optional, SkipSelf} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ErrorMessageComponent } from './error-message/error-message.component';
import { ErrorService } from './error.service';

@NgModule({
  declarations: [ ErrorMessageComponent ],
  exports: [ ErrorMessageComponent ],
  imports: [ BrowserModule ],
  providers: [ ErrorService ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class CoreModule {

  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [ ErrorService ]
    };
  }

  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
