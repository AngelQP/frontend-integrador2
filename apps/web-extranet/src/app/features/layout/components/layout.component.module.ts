import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { LANDING_COMPONENTS } from '.';



@NgModule({
  imports: [SharedModule],
  declarations: [...LANDING_COMPONENTS],
  exports: [...LANDING_COMPONENTS],
})
export class LayoutComponentModule {}
