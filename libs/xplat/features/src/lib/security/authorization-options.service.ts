import { Injectable } from "@angular/core";
import { MenuService } from "@tramarsa/xplat/core";
import { map, shareReplay } from "rxjs/operators";
import { AuthConfiguration, AuthenticationService } from ".";
import * as R from 'ramda';
import { Observable } from "rxjs";

@Injectable()
export class AuthorizationOptionsService {
  constructor(private authConfig: AuthConfiguration,
    private menuService: MenuService,
    private authenticationService: AuthenticationService) {

  }

  $autorizations = this.menuService
    .getMenu(this.authConfig.clientId,
      this.authenticationService.userId())
    .pipe(shareReplay());
  public getOptionsAsync(): Observable<any> {
    return this.$autorizations.pipe(shareReplay())
      .pipe(map((r: any) => {

        const itemsSite = MapSite;
        const toppermitions = R.chain((n: any) => [...n.children], r.data);
        const nextpermitions = R.chain((n: any) => [...n.children], toppermitions);
        const permitions = [...toppermitions, ...nextpermitions];
        return itemsSite.filter((value: any) => {
          const permition = permitions.find((p: any) => !value.authorizationCode || p.code == value.authorizationCode);
          value.items = value.items?.filter((i: any) => {
            const value_ = permitions.find((p: any) => !i.authorizationCode || p.code == i.authorizationCode);
            return value_;
          });
          return permition || (!value.authorizationCode && value.items?.length == 0);
        })

      }))
  }
}

export const MapSite: any[] = [
  {
    label: 'Direccionamiento',
    authorizationCode: 'pwebtram.direccionamiento',
    items: [
      { label: 'Direccionamiento', routerLink: "/direccionamiento", authorizationCode: 'pwebtram.direccionamiento.executive' },
      { label: 'Direccionamiento', routerLink: "/direccionamiento/client", authorizationCode: 'pwebtram.direccionamiento.client' },
      { label: 'Direccionamiento Permanente', routerLink: "/direccionamiento/permanente", authorizationCode: 'pwebtram.direccionamiento.permanente' },
      { label: 'Depósitos', routerLink: "/direccionamiento/deposito", authorizationCode: 'pwebtram.direccionamiento.deposito' }
    ]
  },
  {
    label: 'Desgloses',
    routerLink: "/desglose/client",
    authorizationCode: 'pwebtram.desgloseclient'
  },
  {
    label: 'Desgloses',
    routerLink: "/desglose/executive",
    authorizationCode: 'pwebtram.desgloseexecutive'
  },
  {
    label: 'Itinerarios',
    routerLink: '/itinerarios',
    authorizationCode: "pwebtram.itinerario"
  },
  {
    label: 'Sobrestadía',
    routerLink: "/sobreestadia",
    authorizationCode: 'pwebtram.sobrestadia'
  },
  // {
  //   label: 'Pre-registro de Clientes',
  //   routerLink: "/aprobarusuario",
  //   authorizationCode: 'pwebtram.preregistro'
  // },
  {
    label: 'Clientes',
    authorizationCode: 'pwebtram.clientes',
    items: [
      { label: 'Pre-registro de Clientes', routerLink: "/registro", authorizationCode: 'pwebtram.clientes.preregistro' },
      { label: 'Registro de Clientes', routerLink: "/registro/cliente", authorizationCode: 'pwebtram.clientes.reg' },
    ]
  },
  {
    label: 'Conciliación Bancaria',
    authorizationCode: 'pwebtram.conciliacion',
    items: [
      { label: 'Movimientos Bancarios', routerLink: "/bancos", authorizationCode: 'pwebtram.conciliacion.movimiento' },
      // { label: 'Liquidación de Naves', routerLink: "/bancos/liquidacion", authorizationCode: 'pwebtram.conciliacion.liquidacion' },
      { label: 'Liquidación de Naves', routerLink: "/bancos/liquidacion/v2", authorizationCode: 'pwebtram.conciliacion.liquidacion' },
    ]
  },
  {
    label: 'Solicitud de Facturación',
    routerLink: "/servicioskn",
    authorizationCode: 'pwebtram.facturacion'
  },
  {
    label: 'Emision de BLs',
    // routerLink: "/emisionbl",
    authorizationCode: 'pwebtram.emisionbl',
    items: [
      { label: 'Consulta Emision de BL', routerLink: "/emisionbl", authorizationCode: 'pwebtram.emisionbl.consultaemisionbl' },
      { label: 'Clientes VIP', routerLink: "/emisionbl/clientevip", authorizationCode: 'pwebtram.emisionbl.clientevip' },
      { label: 'Bloqueo de BL', routerLink: "/emisionbl/bloqueos", authorizationCode: 'pwebtram.bloqueobl' }
    ]
  },
  {
    label: 'Control de sobreestadia',
    authorizationCode: 'pwebtram.contrsobre',
    items: [
      { label: 'Liquidacion', routerLink: "/controlsobreestadia", authorizationCode: 'pwebtram.contrsobreliq' },
      { label: 'Consulta BLs Facturados', routerLink: "/controlsobreestadia/with", authorizationCode: 'pwebtram.contrsobreccf' },
      { label: 'Consulta BLs sin Facturar', routerLink: "/controlsobreestadia/without", authorizationCode: 'pwebtram.contrsobreccsf' },
      // { label: 'Comprobantes', routerLink: "/generaciondoc", authorizationCode: 'pwebtram.comprobante' },
      // { label: 'Tickets Comprobantes', routerLink: "/generaciondoc/tickets", authorizationCode: 'pwebtram.ticket' },
    ]
  },
  {
    label: 'Documentos',
    authorizationCode: 'pwebtram.documento',
    items:[
      { label: 'Comprobantes', routerLink: "/generaciondoc", authorizationCode: 'pwebtram.comprobante' },
      { label: 'Tickets Comprobantes', routerLink: "/generaciondoc/tickets", authorizationCode: 'pwebtram.ticket' },
    ]
  },
  {
    label: 'Reportes BI',
    authorizationCode: 'pwebtram.reporte',
    items:[
      { label: 'Reporte General Operaciones', routerLink: "/reporteria/rgo", authorizationCode: 'pwebtram.ReporteRGO' },
      { label: 'Reporte Cuentas Por Cobrar', routerLink: "/reporteria/cpc", authorizationCode: 'pwebtram.ReporteCPC' },
      { label: 'Reporte Indicadores AGMA', routerLink: "/reporteria/meb", authorizationCode: 'pwebtram.ReporteMEB' },
      { label: 'Reporte de Facturación', routerLink: "/reporteria/fct", authorizationCode: 'pwebtram.ReporteFCT' },
      { label: 'Reporte TCSA', routerLink: "/reporteria/tcsa", authorizationCode: 'pwebtram.ReporteTCSA' },
      { label: 'Reporte de Adquisiciones', routerLink: "/reporteria/adq", authorizationCode: 'pwebtram.ReporteADQ' },
      { label: 'Reporte de KOs', routerLink: "/reporteria/kos", authorizationCode: 'pwebtram.ReporteKOS' },
      { label: 'Reporte de Solicitud de Pedido', routerLink: "/reporteria/sol", authorizationCode: 'pwebtram.ReporteSOL' }
    ]
  },
  {
    label:"Gestión de Concesiones", authorizationCode:'pwebtram.conseciones',
    items:[
      { label:"Concesiones", routerLink:"/concesiones", authorizationCode:'pwebtram.consultar' },
      { label:"Aprobaciones", routerLink:"/concesiones/aprobaciones", authorizationCode:'pwebtram.aprobaciones' }
    ]
  },
  {
    label: 'Solicitud de Servicio',
    routerLink: "/solicitud-servicio",
    authorizationCode: 'pwebtram.solserv'
  },
  {
    label: 'Control de Cobros locales',
    authorizationCode: 'pwebtram.cobrlocal',
    items: [
      { label: 'Liquidacion', routerLink: "/cobros-locales", authorizationCode: 'pwebtram.cobrlocal.liq' },
      { label: 'Consulta BLs Facturados', routerLink: "/cobros-locales/with", authorizationCode: 'pwebtram.cobrlocal.Fact' },
      { label: 'Consulta BLs Sin Facturar', routerLink: "/cobros-locales/without", authorizationCode: 'pwebtram.cobrlocal.SinFact' },
      { label: 'Facturación Integral', routerLink: "/cobros-locales/facturacion-integral", authorizationCode: 'pwebtram.cobrlocal.FactInt' }
    ]
  },
  {
    label: 'Recuperables KO',
    routerLink: "/recuperables-ko",
    authorizationCode: 'pwebtram.ko'
  },
];
