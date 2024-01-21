import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './header/header.component';
import {RouterLinkActive, RouterLinkWithHref} from "@angular/router";
import {LanguageSelectComponent} from "./language-select/language-select.component";
import {CourseCardComponent} from "./course-card/course-card.component";
import {ModulesListingComponent} from "./modules-listing/modules-listing.component";


@NgModule({
  declarations: [
    HeaderComponent,
    LanguageSelectComponent,
    CourseCardComponent,
    ModulesListingComponent
  ],
  exports: [
    HeaderComponent,
    LanguageSelectComponent,
    CourseCardComponent,
    ModulesListingComponent
  ],
  imports: [
    CommonModule,
    RouterLinkWithHref,
    RouterLinkActive
  ]
})
export class PartialsModule {
}
