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

      // {
      //   path: 'desglose',
      //   loadChildren: () =>
      //     import('../desglose/desglose.module').then((m) => m.DesgloseModule)
      // },
      // {
      //   path: 'direccionamiento',
      //   loadChildren: () =>
      //     import('../direccionamiento/direccionamiento.module').then((m) => m.DireccionamientoModule)
      // },
      // {
      //   path: 'itinerarios',
      //   loadChildren: () =>
      //     import('../itinerarios/itinerarios.module').then((m) => m.ItinereriosModule)
      // },
      // {
      //   path: 'sobreestadia',
      //   loadChildren: () =>
      //     import('../sobreestadia/sobreestadia.module').then((m) => m.SobreestadiaModule)
      // },
      // {
      //   path: 'servicioskn',
      //   loadChildren: () => import('../servicioskn/servicioskn.module').then((m) => m.ServicioKNModule)
      // },
      // {
      //   path: 'generaciondoc',
      //   loadChildren: () => import('../generaciondoc/generaciondoc.modules').then((m) => m.GeneracionDocModule)
      // },
      // {
      //   path: 'emisionbl',
      //   loadChildren: () => import('../emisionbl/emisionbl.module').then((m) => m.EmisionBLModule)
      // },
      // {
      //   path: 'reporteria',
      //   loadChildren: () => import('../reporteria/reporteria.module').then((m) => m.ReporteriaModule)
      // },
      // {
      //   path:'solicitud-servicio',
      //   loadChildren:()=> import('../solicitudServicio/solicitudServicio.module').then((m)=> m.SolicitudServicioModule)
      // },
      // {
      //   path:'recuperables-ko',
      //   loadChildren:()=> import('../recuperablesok/recuperablesok.module').then((m)=> m.RecuperablesokModule)
      // },
      {
        path:'productos',
        loadChildren:()=> import('../version/version.module').then((m)=> m.VersionModule)
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
