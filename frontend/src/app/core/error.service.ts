import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/src/Subject';

import { Error } from './error.model';

@Injectable()
export class ErrorService {
  error = new Subject<Error>();

  constructor() { }

  sendError(error: Error) {
    console.error('The following error has been raised', error);
    this.error.next(error);
  }

}
