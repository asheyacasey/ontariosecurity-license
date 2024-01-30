import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingV1Component} from './landing-v1/landing-v1.component';
import {PartialsModule} from "../../partials/partials.module";
import {LandingRoutingModule} from "./landing-routing.module";
import {CoursesListComponent} from './courses-list/courses-list.component';
import {MainComponent} from './main/main.component';
import {FaqComponent} from './faq/faq.component';
import {FooterComponent} from './footer/footer.component';
import {LandingV2Component} from './landing-v2/landing-v2.component';
import {LandingRegisterComponent} from './register/landing-register.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LandingV1Component,
    CoursesListComponent,
    MainComponent,
    FaqComponent,
    FooterComponent,
    LandingV2Component,
    LandingRegisterComponent,
  ],
  imports: [
    CommonModule,
    PartialsModule,
    LandingRoutingModule,
    ReactiveFormsModule,
  ]
})
export class LandingModule {
}
