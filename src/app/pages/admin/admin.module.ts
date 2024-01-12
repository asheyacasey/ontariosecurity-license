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
import {NgbDatepickerModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import { DiscountCodesComponent } from './discount-codes/discount-codes.component';
import { DiscountCodesListComponent } from './discount-codes/discount-codes-list/discount-codes-list.component';
import { DiscountCodeNewComponent } from './discount-codes/discount-code-new/discount-code-new.component';
import { DiscountCodeEditComponent } from './discount-codes/discount-code-edit/discount-code-edit.component';
import { DiscountCodeFormComponent } from './discount-codes/discount-code-form/discount-code-form.component';



@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    CoursesComponent,
    PaymentsComponent,
    CourseProgressComponent,
    MenuListComponent,
    DiscountCodesComponent,
    DiscountCodesListComponent,
    DiscountCodeNewComponent,
    DiscountCodeEditComponent,
    DiscountCodeFormComponent
  ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        PartialsModule,
        ReactiveFormsModule,
        NgbPaginationModule,
        NgbDatepickerModule
    ]
})
export class AdminModule { }
