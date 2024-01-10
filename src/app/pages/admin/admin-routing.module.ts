import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AdminGuard} from "./guards/admin.guard";
import {UsersComponent} from "./users/users.component";
import {CoursesComponent} from "./courses/courses.component";
import {PaymentsComponent} from "./payments/payments.component";
import {CourseProgressComponent} from "./course-progress/course-progress.component";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'courses',
        component: CoursesComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'course-progress',
        component: CourseProgressComponent
      },
      {
        path: '**',
        redirectTo: 'users'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
