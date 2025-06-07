import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { COMPONENTS } from "./components";
import { AutorizationGuard } from "@tramarsa/xplat/features";
import { SharedModule } from '../shared/shared.module';
import { InventoryNewComponent, InventoryEditComponent, SearchInventoryComponent } from "./components";

export const routes: Routes = [
  {
    path: '',
    component: SearchInventoryComponent,
    // canActivate: [AutorizationGuard],
    // data: { authorizationCode: 'pweb.clientes' },
    children:[
      {
        path: 'new',
        component: InventoryNewComponent
      },
      {
        path: 'edit/:id',
        component: InventoryEditComponent
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
export class InventoryModule {}
