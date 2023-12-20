import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then((m) => m.LandingModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./pages/start/start.module').then((m) => m.StartModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then((m) => m.ProfileModule)
  },
  {
    path: 'learn',
    loadChildren: () => import('./pages/learn/learn.module').then((m) => m.LearnModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
