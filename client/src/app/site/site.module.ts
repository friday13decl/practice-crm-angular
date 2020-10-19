import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';

import {SiteRoutingModule} from './site-routing.module';
import {SiteLayoutComponent} from './site-layout/site-layout.component';
import {OverviewPageComponent} from './overview-page/overview-page.component';
import {AnalyticsPageComponent} from './analytics-page/analytics-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {OrderPageComponent} from './order-page/order-page.component';
import {CategoriesPageComponent} from './categories-page/categories-page.component';
import {CategoriesFormComponent} from './categories-page/categories-form/categories-form.component';
import {PositionsFormComponent} from './categories-page/categories-form/positions-form/positions-form.component';
import {OrderCategoriesComponent} from './order-page/order-categories/order-categories.component';
import {OrderPositionsComponent} from './order-page/order-positions/order-positions.component';


@NgModule({
  declarations: [
    SiteLayoutComponent,
    OverviewPageComponent,
    AnalyticsPageComponent,
    HistoryPageComponent,
    OrderPageComponent,
    CategoriesPageComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
    OrderCategoriesComponent,
    OrderPositionsComponent
  ],
  imports: [
    SiteRoutingModule,
    SharedModule
  ],
  providers: []
})
export class SiteModule {
}

