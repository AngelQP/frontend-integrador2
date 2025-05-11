import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { HOME_COMPONENTS, HomeComponent } from './components';
import { LayoutComponentModule } from '../layout/components/layout.component.module'
export const routes: Routes = [
  {
    path: '',
    data:{ showMenu : false },
    component: HomeComponent
  },
];

@NgModule({
  imports: [SharedModule, LayoutComponentModule, RouterModule.forChild(routes)],
  declarations: [...HOME_COMPONENTS],
  exports: [...HOME_COMPONENTS],
})
export class HomeModule {}
