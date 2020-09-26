import {Component, OnInit} from '@angular/core';
import {BasePageComponent} from "../base-page/base-page.component";

@Component({
  selector: 'app-login-page',
  templateUrl: '../base-page/base-page.component.html',
  styleUrls: ['../base-page/base-page.component.scss']
})
export class LoginPageComponent extends BasePageComponent implements OnInit {

  constructor() {
    super();
    this.headerText = 'Login into system';
    this.submitBtnText = 'Login';
  }

  ngOnInit(): void {
  }

}
