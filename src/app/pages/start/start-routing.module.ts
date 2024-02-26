import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StartComponent} from "./start.component";
import {RegisterComponent} from "./register/register.component";
import {ChooseCourseComponent} from "./choose-course/choose-course.component";
import {PayComponent} from "./pay/pay.component";
import {NotLoggedInGuard} from "./guards/not-logged-in.guard";
import {NoCourseBoughtGuard} from "./guards/no-course-bought.guard";
import {LoggedInGuard} from "./guards/logged-in.guard";
import {CourseSelectedGuard} from "./guards/course-selected.guard";
import {CompletedComponent} from "./completed/completed.component";
import {CoursePaymentStartedGuard} from "./guards/course-payment-started.guard";
import {TellUsAboutYouComponent} from "./tell-us-about-you/tell-us-about-you.component";

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    children: [
      {
        path: 'tell-us-about-you',
        component: TellUsAboutYouComponent,
        canActivate: [NotLoggedInGuard]
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotLoggedInGuard]
      },
      {
        path: 'course',
        component: ChooseCourseComponent,
        canActivate: [LoggedInGuard, NoCourseBoughtGuard]
      },
      {
        path: 'pay',
        component: PayComponent,
        canActivate: [LoggedInGuard, NoCourseBoughtGuard, CourseSelectedGuard]
      },
      {
        path: 'completed',
        component: CompletedComponent,
        canActivate: [LoggedInGuard, CoursePaymentStartedGuard]
      },
      {
        path: '**',
        redirectTo: 'register'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartRoutingModule {
}
