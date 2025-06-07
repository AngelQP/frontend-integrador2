import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { COMPONENTS } from "./components";
import { AutorizationGuard } from "@tramarsa/xplat/features";
import { SharedModule } from '../shared/shared.module';
import { NotificationNewComponent,  NotificationEditComponent, SearchNotificationComponent } from "./components";

export const routes: Routes = [
  {
    path: '',
    component: SearchNotificationComponent,
    // canActivate: [AutorizationGuard],
    // data: { authorizationCode: 'pweb.clientes' },
    children:[
      {
        path: 'new',
        component:  NotificationNewComponent
      },
      {
        path: 'edit/:id',
        component:  NotificationEditComponent
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
export class NotificationModule {}
