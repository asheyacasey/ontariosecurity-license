import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingV1Component} from "./landing-v1/landing-v1.component";
import {NotLoggedInGuard} from "./guards/not-logged-in.guard";
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {LandingV3Component} from "./landing-v3/landing-v3.component";

const routes: Routes = [
  {
    path: '',
    component: LandingV3Component,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'courses',
    component: LandingV1Component,
    canActivate: [NotLoggedInGuard],
    children: [
      {
        path: '',
        component: CoursesListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {
}
