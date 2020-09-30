import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthBaseService} from "./shared/services/auth.base.service";
import {AuthService} from "./shared/services/auth.service";
import {TokenInterceptor} from "./shared/classes/token.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
    {provide: AuthBaseService, useClass: AuthService},
    {provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
