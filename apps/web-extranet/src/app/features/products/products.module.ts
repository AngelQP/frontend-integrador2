import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { COMPONENTS } from "./components";
import { AutorizationGuard } from "@tramarsa/xplat/features";
import { SharedModule } from '../shared/shared.module';
import { ProductNewComponent, ProductViewComponent, ProductEditComponent, SearchProductsComponent } from "./components";

export const routes: Routes = [
  {
    path: '',
    component: SearchProductsComponent,
    // canActivate: [AutorizationGuard],
    // data: { authorizationCode: 'pweb.clientes' },
    children:[
      {
        path: 'new',
        component: ProductNewComponent
      },
      {
        path: 'edit/:id',
        component: ProductEditComponent
      },
      {
        path: 'view/:id',
        component: ProductViewComponent
      }
    ]
  }
]

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [...COMPONENTS],
  declarations:[...COMPONENTS],
  // providers: [ClienteLookupsService]
})
export class ProductsModule {}
