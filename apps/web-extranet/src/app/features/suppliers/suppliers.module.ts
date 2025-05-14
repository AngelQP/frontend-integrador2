import { COMPONENTS, SearchSuppliersComponent, SupplierEditComponent, SupplierNewComponent, SupplierViewComponent } from "./components";

import { SharedModule } from '../shared/shared.module';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

export const routes: Routes = [
  {
      path: '',
      component: SearchSuppliersComponent,
      // canActivate: [AutorizationGuard],
      // data: { authorizationCode: 'pweb.clientes' },
      children:[
        {
          path: 'new',
          component: SupplierNewComponent
        },
        {
          path: 'edit/:id',
          component: SupplierEditComponent
        },
        {
          path: 'view/:id',
          component: SupplierViewComponent
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
export class SuppliersModule {}
