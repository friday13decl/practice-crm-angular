import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';

import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

import {SiteRoutingModule} from "./site-routing.module";
import {SiteLayoutComponent} from './site-layout/site-layout.component';
import {OverviewPageComponent} from './overview-page/overview-page.component';
import {AnalyticsPageComponent} from './analytics-page/analytics-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';


@NgModule({
  declarations: [
    SiteLayoutComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent
  ],
  imports: [
    SiteRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule
  ],
  providers: []
})
export class SiteModule {
}

