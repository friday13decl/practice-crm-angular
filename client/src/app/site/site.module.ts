import {NgModule} from "@angular/core";
import {SiteLayoutComponent} from './site-layout/site-layout.component';
import {SiteRoutingModule} from "./site-routing.module";


@NgModule({
  declarations: [SiteLayoutComponent],
  imports: [
    SiteRoutingModule
  ],
  providers: []
})
export class SiteModule {
}
