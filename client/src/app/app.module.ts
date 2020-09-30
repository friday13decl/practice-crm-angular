import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from "@angular/common/http";
import {AuthBaseService} from "./shared/services/auth.base.service";
import {AuthService} from "./shared/services/auth.service";

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
    {provide: AuthBaseService, useClass: AuthService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
