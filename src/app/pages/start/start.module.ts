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
import { DiscountComponent } from './pay/discount/discount.component';
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import { OrderSummaryComponent } from './pay/order-summary/order-summary.component';


@NgModule({
  declarations: [
    RegisterComponent,
    ChooseCourseComponent,
    PayComponent,
    StartComponent,
    StepsComponent,
    CompletedComponent,
    DiscountComponent,
    OrderSummaryComponent
  ],
    imports: [
        CommonModule,
        StartRoutingModule,
        RouterOutlet,
        PartialsModule,
        ReactiveFormsModule,
        NgbTooltipModule
    ]
})
export class StartModule {
}
