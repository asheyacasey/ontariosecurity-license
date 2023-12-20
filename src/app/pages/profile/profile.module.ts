import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CoursesComponent} from './courses/courses.component';
import { ProfileComponent } from './profile.component';
import {PartialsModule} from "../../partials/partials.module";
import {RouterOutlet} from "@angular/router";
import {ProfileRoutingModule} from "./profile-routing.module";
import { CourseProgressBarComponent } from './courses/course-progress-bar/course-progress-bar.component';


@NgModule({
  declarations: [
    CoursesComponent,
    ProfileComponent,
    CourseProgressBarComponent
  ],
  imports: [
    CommonModule,
    PartialsModule,
    RouterOutlet,
    ProfileRoutingModule
  ]
})
export class ProfileModule {
}
