import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormalitiesComponent } from './formalities.component';
import {FormalitiesRoutingModule} from "./formalities-routing.module";
import {PartialsModule} from "../../partials/partials.module";
import { DocumentsComponent } from './documents/documents.component';
import { RedirectComponent } from './redirect/redirect.component';
import { SectionsListComponent } from './sections-list/sections-list.component';



@NgModule({
  declarations: [
    FormalitiesComponent,
    DocumentsComponent,
    RedirectComponent,
    SectionsListComponent
  ],
  imports: [
    CommonModule,
    FormalitiesRoutingModule,
    PartialsModule
  ]
})
export class FormalitiesModule { }
