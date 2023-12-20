import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterComponent} from './register/register.component';
import {ChooseCourseComponent} from './choose-course/choose-course.component';
import {PayComponent} from './pay/pay.component';
import {StartComponent} from './start.component';
import {RouterOutlet} from "@angular/router";
import {StartRoutingModule} from "./start-routing.module";
import { StepsComponent } from './steps/steps.component';
import {PartialsModule} from "../../partials/partials.module";
import {ReactiveFormsModule} from "@angular/forms";
import { CompletedComponent } from './completed/completed.component';


@NgModule({
  declarations: [
    RegisterComponent,
    ChooseCourseComponent,
    PayComponent,
    StartComponent,
    StepsComponent,
    CompletedComponent
  ],
    imports: [
        CommonModule,
        StartRoutingModule,
        RouterOutlet,
        PartialsModule,
        ReactiveFormsModule
    ]
})
export class StartModule {
}
