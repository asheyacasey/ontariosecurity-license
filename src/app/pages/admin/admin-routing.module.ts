import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from "./admin.component";
import {AdminGuard} from "./guards/admin.guard";
import {UsersComponent} from "./users/users.component";
import {CoursesComponent} from "./courses/courses.component";
import {PaymentsComponent} from "./payments/payments.component";
import {CourseProgressComponent} from "./course-progress/course-progress.component";
import {DiscountCodesComponent} from "./discount-codes/discount-codes.component";
import {DiscountCodesListComponent} from "./discount-codes/discount-codes-list/discount-codes-list.component";
import {DiscountCodeNewComponent} from "./discount-codes/discount-code-new/discount-code-new.component";
import {DiscountCodeEditComponent} from "./discount-codes/discount-code-edit/discount-code-edit.component";

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
        path: 'discount-codes',
        component: DiscountCodesComponent,
        children: [
          {
            path: '',
            component: DiscountCodesListComponent
          },
          {
            path: 'new',
            component: DiscountCodeNewComponent
          },
          {
            path: 'edit/:id',
            component: DiscountCodeEditComponent
          },
          {
            path: '**',
            redirectTo: ''
          }
        ]
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
