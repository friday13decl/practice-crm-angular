import {NgModule} from '@angular/core';

import {SharedModule} from "@shared/shared.module";

import {LoginPageComponent} from './login-page/login-page.component';
import {RegisterPageComponent} from './register-page/register-page.component';
import {AuthRoutingModule} from './auth-routing.module';
import {AuthLayoutComponent} from "./auth-layout/auth-layout.component";


@NgModule({
  declarations: [
    AuthLayoutComponent,
    LoginPageComponent,
    RegisterPageComponent
  ],
  imports: [
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule {
}
