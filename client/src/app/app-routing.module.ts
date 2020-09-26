import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LoginPageComponent} from "./auth/login-page/login-page.component";
import {AuthLayoutComponent} from "./auth/auth-layout/auth-layout.component";
import {RegisterPageComponent} from "./auth/register-page/register-page.component";

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
