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
import {NoAboutYouCompletedGuard} from "./guards/no-about-you-completed.guard";
import {AboutYouCompletedGuard} from "./guards/about-you-completed.guard";

const routes: Routes = [
  {
    path: '',
    component: StartComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [NotLoggedInGuard]
      },
      {
        path: 'tell-us-about-you',
        component: TellUsAboutYouComponent,
        canActivate: [LoggedInGuard, NoCourseBoughtGuard, NoAboutYouCompletedGuard]
      },
      {
        path: 'course',
        component: ChooseCourseComponent,
        canActivate: [LoggedInGuard, NoCourseBoughtGuard, AboutYouCompletedGuard]
      },
      {
        path: 'pay',
        component: PayComponent,
        canActivate: [LoggedInGuard, NoCourseBoughtGuard, AboutYouCompletedGuard, CourseSelectedGuard]
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
