import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingComponent} from "./landing.component";
import {NotLoggedInGuard} from "./guards/not-logged-in.guard";
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    canActivate: [NotLoggedInGuard],
    children: [
      {
        path: '',
        component: MainComponent
      },
      {
        path: 'courses',
        component: CoursesListComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {
}
