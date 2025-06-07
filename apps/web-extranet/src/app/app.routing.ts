// angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// app
import { SharedModule } from './features/shared/shared.module';
import { PageNotFoundComponent } from './features/shared/components';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () =>
      import('./features/layout/layout.module').then((m) => m.LayoutModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./features/forgot-password/forgot-password.module').then((m) => m.ForgotPasswordModule)
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [SharedModule, RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
