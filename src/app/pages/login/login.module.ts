import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {PartialsModule} from "../../partials/partials.module";
import {LoginRoutingModule} from "./login-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {LandingModule} from "../landing/landing.module";



@NgModule({
  declarations: [
    LoginComponent
  ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        PartialsModule,
        ReactiveFormsModule,
        LandingModule
    ]
})
export class LoginModule { }
