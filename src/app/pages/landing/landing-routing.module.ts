import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from "./landing.component";
import {NotLoggedInGuard} from "./guards/not-logged-in.guard";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [NotLoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {
}
