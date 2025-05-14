import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ClientEditComponent, ClientNewComponent, ClientViewComponent, COMPONENTS, SearchClientsComponent } from "./components";

import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    component: SearchClientsComponent,
    // canActivate: [AutorizationGuard],
    // data: { authorizationCode: 'pweb.clientes' },
    children:[
      {
        path: 'new',
        component: ClientNewComponent
      },
      {
        path: 'edit/:id',
        component: ClientEditComponent
      },
      {
        path: 'view/:id',
        component: ClientViewComponent
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
export class ClientsModule {}
