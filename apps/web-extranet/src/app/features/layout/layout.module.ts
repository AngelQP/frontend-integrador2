import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@tramarsa/xplat/features';
import { UnauthorizedComponent } from '../shared/components';

import { SharedModule } from '../shared/shared.module';
import { LayoutComponent, LayoutComponentModule } from './components';
import { APP_MENU_ITEMS } from '../shared/constants/menu.config';

export const ROLES_BY_PATH: Record<string, string[]> = APP_MENU_ITEMS.reduce(
  (acc, item) => {
    const path = item.routerLink.replace(/^\//, ''); // le quita el "/" inicial
    acc[path] = item.roles;
    return acc;
  },
  {} as Record<string, string[]>
);

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path:'productos',
        loadChildren:()=> import('../products/products.module').then((m)=> m.ProductsModule),
        canActivate: [AuthGuard],
        data: { roles: ROLES_BY_PATH['productos'] }
      },
      {
        path:'clientes',
        loadChildren:()=> import('../clients/clients.module').then((m)=> m.ClientsModule),
        canActivate: [AuthGuard],
        data: { roles: ROLES_BY_PATH['clientes'] }
      },
      {
        path:'proveedores',
        loadChildren:()=> import('../suppliers/suppliers.module').then((m)=> m.SuppliersModule),
        canActivate: [AuthGuard],
        data: { roles: ROLES_BY_PATH['proveedores'] }
      },
      {
        path:'usuarios',
        loadChildren:()=> import('../users/users.module').then((m)=> m.UsersModule),
        canActivate: [AuthGuard],
        data: { roles: ROLES_BY_PATH['usuarios'] }
      },
      { path: 'unauthorized', component: UnauthorizedComponent },
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
