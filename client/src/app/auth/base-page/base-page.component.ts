import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent implements OnInit {
  email: FormControl = new FormControl('', [Validators.required, Validators.email]);
  password: FormControl = new FormControl('', [Validators.required, Validators.minLength(6)]);
  hide: boolean = true;

  headerText: string = '';
  submitBtnText: string = '';
  subHeaderText: string = 'Rule the world';

  constructor() { }

  ngOnInit(): void {
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('minlength')) {
      return 'Length is too short';
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }

}
