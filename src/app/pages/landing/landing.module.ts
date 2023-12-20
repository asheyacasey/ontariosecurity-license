import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingComponent} from './landing.component';
import {PartialsModule} from "../../partials/partials.module";
import {LandingRoutingModule} from "./landing-routing.module";


@NgModule({
  declarations: [
    LandingComponent
  ],
  imports: [
    CommonModule,
    PartialsModule,
    LandingRoutingModule
  ]
})
export class LandingModule {
}
