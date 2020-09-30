import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePageComponent} from "../base-page/base-page.component";
import {AuthBaseService} from "../../shared/services/auth.base.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: '../base-page/base-page.component.html',
  styleUrls: ['../base-page/base-page.component.scss']
})
export class LoginPageComponent extends BasePageComponent implements OnInit, OnDestroy {

  authSub: Subscription;

  constructor(private auth: AuthBaseService,
              private router: Router,
              private route: ActivatedRoute) {
    super();
    this.headerText = 'Login into system';
    this.submitBtnText = 'Login';
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {

      } else if (params['accessDenied']) {

      }
    });
  }

  onSubmit(): void {
    this.form.disable();

    this.authSub = this.auth.login(this.form.value).subscribe(async res => {
      await this.router.navigate(['/overview']);
    }, err => {
      console.warn(err);
      this.form.enable();
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
