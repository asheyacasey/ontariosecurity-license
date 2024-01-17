import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FormalitiesComponent} from "./formalities.component";
import {DocumentsComponent} from "./documents/documents.component";
import {CprComponent} from "./cpr/cpr.component";
import {ConsentComponent} from "./consent/consent.component";
import {TcnComponent} from "./tcn/tcn.component";

const routes: Routes = [
  {
    path: ':courseId',
    component: FormalitiesComponent,
    title: 'Formalities | Ontario Security License',
    children: [
      {
        path: 'cpr',
        component: CprComponent,
        title: 'CPR | Ontario Security License'
      },
      {
        path: 'consent',
        component: ConsentComponent,
        title: 'Consent and Liability form | Ontario Security License'
      },
      {
        path: 'tcn',
        component: TcnComponent,
        title: 'TCN | Ontario Security License'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormalitiesRoutingModule {
}
