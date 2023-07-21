import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: ['./base-form.component.scss']
})
export class BaseFormComponent {

  errorMessage: string = '';
  private destroyed$ = new Subject<void>();
  private formSubmitted = false;
}
