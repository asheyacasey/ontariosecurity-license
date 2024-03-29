import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormalitiesComponent } from './formalities.component';
import {FormalitiesRoutingModule} from "./formalities-routing.module";
import {PartialsModule} from "../../partials/partials.module";
import { DocumentsComponent } from './documents/documents.component';
import { SectionsListComponent } from './sections-list/sections-list.component';
import { CprComponent } from './cpr/cpr.component';
import { ConsentComponent } from './consent/consent.component';
import { TcnComponent } from './tcn/tcn.component';
import {ReactiveFormsModule} from "@angular/forms";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxSignaturePadModule} from "@eve-sama/ngx-signature-pad";
import {ClipboardModule} from "ngx-clipboard";
import { ResumeComponent } from './resume/resume.component';
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import { OneOnOneComponent } from './one-on-one/one-on-one.component';



@NgModule({
    declarations: [
        FormalitiesComponent,
        DocumentsComponent,
        SectionsListComponent,
        CprComponent,
        ConsentComponent,
        TcnComponent,
        ResumeComponent,
        OneOnOneComponent
    ],
    exports: [
        FormalitiesComponent
    ],
  imports: [
    CommonModule,
    FormalitiesRoutingModule,
    PartialsModule,
    ReactiveFormsModule,
    NgbDatepickerModule,
    NgxSignaturePadModule,
    ClipboardModule,
    NgMultiSelectDropDownModule,
  ]
})
export class FormalitiesModule { }
