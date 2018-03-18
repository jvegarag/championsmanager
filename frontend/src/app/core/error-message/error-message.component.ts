import { Component, OnInit } from '@angular/core';
import { Error } from '../error.model';
import { ErrorService } from '../error.service';

@Component({
  selector: 'cmp-core-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {

  error: Error;

  constructor(private errorService: ErrorService) { }

  ngOnInit() {
    this.errorService.error.subscribe(error => {
      this.error = error;
    });
   }

  close(): void {
    this.error = null;
  }

}
