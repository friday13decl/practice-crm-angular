import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasePageComponent} from "../base-page/base-page.component";
import {AuthBaseService} from "../../shared/services/auth.base.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register-page',
  templateUrl: '../base-page/base-page.component.html',
  styleUrls: ['../base-page/base-page.component.scss']
})
export class RegisterPageComponent extends BasePageComponent implements OnInit, OnDestroy {

  authSub: Subscription;

  constructor(private auth: AuthBaseService,
              private router: Router,
              snackbar: MatSnackBar) {
    super(snackbar);
    this.headerText = 'Create new account';
    this.submitBtnText = 'Register';
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  onSubmit(): void {
    this.form.disable();
    this.authSub = this.auth.register(this.form.value).subscribe(async () => {
        await this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      err => {
        this.showToast(err.error.message);
        this.form.enable();
      }
    )
  }

  ngOnDestroy(): void {
    if (this.authSub) {
      this.authSub.unsubscribe();
    }
  }

}
