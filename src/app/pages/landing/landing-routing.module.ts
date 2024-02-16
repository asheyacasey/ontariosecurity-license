import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingV1Component} from "./landing-v1/landing-v1.component";
import {NotLoggedInGuard} from "./guards/not-logged-in.guard";
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {LandingV3Component} from "./landing-v3/landing-v3.component";
import {LandingRedirectComponent} from "./landing-redirect/landing-redirect.component";
import {EligibilityTestComponent} from "./eligibility-test/eligibility-test.component";
import {TermsOfServiceComponent} from "./terms-of-service/terms-of-service.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {StartComponent} from "../start/start.component";
import {StaticComponent} from "./static/static.component";

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
  },

  {
    path: 's',
    component: StaticComponent,
    children: [
      {
        path: 'terms-of-service',
        component: TermsOfServiceComponent
      },
      {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
      },
    ]
  },
  // redirects to fragments
  {
    path: 'testimonials',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'course',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'guarantee',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'in-person',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'why-us',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'international-students',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'faq',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'sign-up',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {
}
