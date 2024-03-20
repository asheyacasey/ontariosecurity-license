import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LandingV1Component} from "./landing-v1/landing-v1.component";
import {NotLoggedInGuard} from "./guards/not-logged-in.guard";
import {CoursesListComponent} from "./courses-list/courses-list.component";
import {LandingRedirectComponent} from "./landing-redirect/landing-redirect.component";
import {TermsOfServiceComponent} from "./terms-of-service/terms-of-service.component";
import {PrivacyPolicyComponent} from "./privacy-policy/privacy-policy.component";
import {StaticComponent} from "./static/static.component";
import {LandingV4Component} from "./landing-v4/landing-v4.component";

const routes: Routes = [
  {
    path: '',
    component: LandingV4Component,
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
    path: 'job',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'why-us',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'guarantee',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'testimonials',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'how-to',
    component: LandingRedirectComponent,
    canActivate: [NotLoggedInGuard]
  },
  {
    path: 'quiz',
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
