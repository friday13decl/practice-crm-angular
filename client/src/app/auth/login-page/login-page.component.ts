import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePageComponent} from "../base-page/base-page.component";
import {IAuthService} from "@core/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login-page',
  templateUrl: '../base-page/base-page.component.html',
  styleUrls: ['../base-page/base-page.component.scss']
})
export class LoginPageComponent extends BasePageComponent implements OnInit, OnDestroy {

  authSub: Subscription;

  constructor(private auth: IAuthService,
              private router: Router,
              private route: ActivatedRoute,
              snackbar: MatSnackBar) {
    super(snackbar);
    this.headerText = 'Login into system';
    this.submitBtnText = 'Login';
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        this.showToast('Now you can login with your credentials');
      } else if (params['accessDenied']) {
        this.showToast('Please login into system');
      } else if (params['sessionFailed']) {
        this.showToast('Your session is expired. Please login into system again');
      }
    });
  }

  onSubmit(): void {
    this.form.disable();

    this.authSub = this.auth.login(this.form.value).subscribe(async () => {
      await this.router.navigate(['/overview']);
    }, err => {
      this.showToast(err.error.message);
      this.form.enable();
    });
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }
}
