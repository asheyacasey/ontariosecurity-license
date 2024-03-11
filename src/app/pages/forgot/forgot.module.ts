import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetComponent } from './reset/reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {RouterOutlet} from "@angular/router";
import {ForgotRoutingModule} from "./forgot-routing.module";
import {PartialsModule} from "../../partials/partials.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ForgotComponent,
    ResetComponent,
    ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    ForgotRoutingModule,
    PartialsModule,
    ReactiveFormsModule
  ]
})
export class ForgotModule { }
