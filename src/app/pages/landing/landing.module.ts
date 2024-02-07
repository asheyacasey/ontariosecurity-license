import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingV1Component} from './landing-v1/landing-v1.component';
import {PartialsModule} from "../../partials/partials.module";
import {LandingRoutingModule} from "./landing-routing.module";
import {CoursesListComponent} from './courses-list/courses-list.component';
import {MainComponent} from './main/main.component';
import {FaqComponent} from './faq/faq.component';
import {FooterComponent} from './footer/footer.component';
import {LandingV3Component} from './landing-v3/landing-v3.component';
import {LandingRegisterComponent} from './register/landing-register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CountUpModule} from "ngx-countup";
import { TestimonialsComponent } from './testimonials/testimonials.component';


@NgModule({
  declarations: [
    LandingV1Component,
    CoursesListComponent,
    MainComponent,
    FaqComponent,
    FooterComponent,
    LandingV3Component,
    LandingRegisterComponent,
    TestimonialsComponent,
  ],
    imports: [
        CommonModule,
        PartialsModule,
        LandingRoutingModule,
        ReactiveFormsModule,
        CountUpModule,
    ]
})
export class LandingModule {
}
