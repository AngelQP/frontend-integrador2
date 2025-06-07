import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@tramarsa/xplat/features';
import { PageNotFoundComponent, UnauthorizedComponent } from '../shared/components';

import { SharedModule } from '../shared/shared.module';
import { LayoutComponent, LayoutComponentModule } from './components';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'productos',
        loadChildren:()=> import('../products/products.module').then((m)=> m.ProductsModule)
      },
      {
        path:'clientes',
        loadChildren:()=> import('../clients/clients.module').then((m)=> m.ClientsModule)
      },
      {
        path:'proveedores',
        loadChildren:()=> import('../suppliers/suppliers.module').then((m)=> m.SuppliersModule)
      },
      {
        path:'usuarios',
        loadChildren:()=> import('../users/users.module').then((m)=> m.UsersModule)
      },
      { path: 'unauthorized', component: UnauthorizedComponent },
      {
        path:'inventario',
        loadChildren:()=> import('../inventory/inventory.module').then((m)=> m.InventoryModule)
      },
      {
        path:'notificacion',
        loadChildren:()=> import('../notification/notification.module').then((m)=> m.NotificationModule)
      },
      {
        path: 'version',
        loadChildren: () => import('../version/version.module').then((m) => m.VersionModule)
      },
    ]
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('../home/home.module').then((m) => m.HomeModule),
  }
];

@NgModule({
  imports: [SharedModule, LayoutComponentModule, RouterModule.forChild(routes)],
  declarations: [LayoutComponent],
  exports: [LayoutComponent],
})
export class LayoutModule { }
