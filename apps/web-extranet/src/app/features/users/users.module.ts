import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { COMPONENTS, SearchUsersComponent, UserEditComponent, UserNewComponent, UserViewComponent } from "./components";
import { AutorizationGuard } from "@tramarsa/xplat/features";
import { SharedModule } from '../shared/shared.module';

export const routes: Routes = [
  {
    path: '',
    component: SearchUsersComponent,
    // canActivate: [AutorizationGuard],
    // data: { authorizationCode: 'pweb.clientes' },
    children:[
      {
        path: 'new',
        component: UserNewComponent
      },
      {
        path: 'edit/:id',
        component: UserEditComponent
      },
      {
        path: 'view/:id',
        component: UserViewComponent
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
export class UsersModule {}
