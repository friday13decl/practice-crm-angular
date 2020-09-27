import {Component, OnInit} from '@angular/core';
import {AuthInterface, BasePageComponent} from "../base-page/base-page.component";

@Component({
  selector: 'app-register-page',
  templateUrl: '../base-page/base-page.component.html',
  styleUrls: ['../base-page/base-page.component.scss']
})
export class RegisterPageComponent extends BasePageComponent implements OnInit, AuthInterface {

  constructor() {
    super();
    this.headerText = 'Create new account';
    this.submitBtnText = 'Register';
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  onSubmit(): void {

  }

}
