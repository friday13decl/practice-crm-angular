import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {SiteLayoutComponent} from "./site-layout/site-layout.component";
import {AuthGuard} from "../shared/classes/auth.guard";

const routes: Routes = [
  {
    path: 'overview', component: SiteLayoutComponent, canActivate: [AuthGuard]
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SiteRoutingModule {
}
