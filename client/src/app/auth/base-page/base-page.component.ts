import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({template: ''})
export abstract class BasePageComponent implements OnInit {

  form: FormGroup;

  hide = true;

  headerText = '';
  submitBtnText = '';
  subHeaderText = 'Rule the world';

  protected constructor(private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  showToast(msg: string): void {
    this.snackbar.open(msg, null, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  abstract onSubmit(): void;

  getErrorMessage(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('minlength')) {
      return `Password should be more than ${control.errors.minlength.requiredLength} symbols`;
    }

    return control.hasError('email') ? 'Not a valid email' : '';
  }

}
