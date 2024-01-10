import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/landing/landing.module').then((m) => m.LandingModule),
    title: 'Ontario Security License'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((m) => m.LoginModule),
    title: 'Login | Ontario Security License'
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
  },
  {
    path: 'formalities',
    loadChildren: () => import('./pages/formalities/formalities.module').then((m) => m.FormalitiesModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
