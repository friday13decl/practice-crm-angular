import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface AuthInterface {
  onSubmit(): void;
}

@Component({template: ''})
export abstract class BasePageComponent implements OnInit {
  form: FormGroup;
  email: FormControl;
  password: FormControl;

  hide: boolean = true;

  headerText: string = '';
  submitBtnText: string = '';
  subHeaderText: string = 'Rule the world';

  ngOnInit(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(6)]);

    this.form = new FormGroup({
      email: this.email,
      password: this.password
    });
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('minlength')) {
      return `Password should be more than ${control.errors['minlength']['requiredLength']} symbols`;
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }

}
