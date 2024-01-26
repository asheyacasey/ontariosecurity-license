import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './landing.component';
import {PartialsModule} from "../../partials/partials.module";
import {LandingRoutingModule} from "./landing-routing.module";
import { CoursesListComponent } from './courses-list/courses-list.component';
import { MainComponent } from './main/main.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    LandingComponent,
    CoursesListComponent,
    MainComponent,
    FaqComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    PartialsModule,
    LandingRoutingModule,
  ]
})
export class LandingModule {
}
