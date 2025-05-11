import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components';

import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    component:LoginComponent
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class LoginModule {}
