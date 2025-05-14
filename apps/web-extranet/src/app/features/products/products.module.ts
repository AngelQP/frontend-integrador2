
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import {ProductsNewComponent} from './components';
import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
    {
      path: '',
      data:{ showMenu : false },
      component: ProductsNewComponent
    },
  ];

@NgModule({
    declarations: [
        ProductsNewComponent,
        
    ],
    exports: [
        ProductsNewComponent,
    ],
  
    imports: [
        CommonModule,	
        SharedModule,
        RouterModule.forChild(routes)
    ],
    
  })
  export class ProductsModule { }