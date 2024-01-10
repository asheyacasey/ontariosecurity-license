import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {AdminRoutingModule} from "./admin-routing.module";
import { UsersComponent } from './users/users.component';
import { CoursesComponent } from './courses/courses.component';
import { PaymentsComponent } from './payments/payments.component';
import { CourseProgressComponent } from './course-progress/course-progress.component';
import {PartialsModule} from "../../partials/partials.module";
import { MenuListComponent } from './menu-list/menu-list.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";



@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    CoursesComponent,
    PaymentsComponent,
    CourseProgressComponent,
    MenuListComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        PartialsModule,
        ReactiveFormsModule,
        NgbPaginationModule
    ]
})
export class AdminModule { }
