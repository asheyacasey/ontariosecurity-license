import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormalitiesComponent} from "./formalities.component";
import {DocumentsComponent} from "./documents/documents.component";
import {RedirectComponent} from "./redirect/redirect.component";

const routes: Routes = [
  {
    path: ':courseId',
    component: FormalitiesComponent,
    title: 'Formalities | Ontario Security License',
    children: [
      {
        path: '',
        component: RedirectComponent
      },
      {
        path: 'documents',
        component: DocumentsComponent,
        title: 'CPR + Consent Form | Ontario Security License',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormalitiesRoutingModule {
}
