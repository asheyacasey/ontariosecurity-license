import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {NotLoggedInGuard} from "../start/guards/not-logged-in.guard";
import {ResetComponent} from "./reset/reset.component";
import {ForgotComponent} from "./forgot/forgot.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";

const routes: Routes = [
  {
    path: 'password',
    component: ForgotPasswordComponent,
    canActivate: [NotLoggedInGuard],
    children: [
      {
        path: '',
        component: ForgotComponent
      },
      {
        path: 'reset/:resetCode',
        component: ResetComponent,
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'password'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgotRoutingModule {
}
