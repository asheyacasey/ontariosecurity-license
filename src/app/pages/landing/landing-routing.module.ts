import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingV1Component} from "./landing-v1/landing-v1.component";
import {NotLoggedInGuard} from "./guards/not-logged-in.guard";
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {MainComponent} from "./main/main.component";
import {LandingV2Component} from "./landing-v2/landing-v2.component";

const routes: Routes = [
  {
    path: '',
    component: LandingV2Component,
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
