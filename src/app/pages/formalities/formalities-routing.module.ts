import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormalitiesComponent} from "./formalities.component";
import {DocumentsComponent} from "./documents/documents.component";

const routes: Routes = [
  {
    path: ':courseId/documents',
    component: FormalitiesComponent,
    title: 'Formalities | Ontario Security License'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormalitiesRoutingModule {
}
