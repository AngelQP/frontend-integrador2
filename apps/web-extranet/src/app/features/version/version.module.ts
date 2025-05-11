import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import { HOME_COMPONENTS, VersionComponent } from './components';
import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
    {
      path: '',
      data:{ showMenu : false },
      component: VersionComponent
    },
  ];

@NgModule({
    declarations: [
        VersionComponent,
        
    ],
    exports: [
        VersionComponent,
    ],
  
    imports: [
        CommonModule,	
        SharedModule,
        RouterModule.forChild(routes)
    ],
    
  })
  export class VersionModule { }