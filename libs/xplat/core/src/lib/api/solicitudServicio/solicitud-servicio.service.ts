import { Injectable } from "@angular/core";
import { ApiBaseService } from "../api.base.service";
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from "../../services";
import { environment } from "../../environments";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable()
export class SolicitudServicioService extends ApiBaseService{
  constructor(private httpClientService: HttpClientService) 
  { 
      super();
      this.endpoint = environment.endpoint.solicitudServicio;
  }

  public search(codigoSociedad: any, 
    codigoNegocio: any, 
    codigoSucursal: any, 
    recalada: any,
    codigoSolicitante: any,
    codigoEstado:any,
    desde: any,
    hasta: any,
    startAt:any,
    maxResult:any,
    progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
    
      const query = new QueryStringBuilder()
      .add("codigoSociedad", codigoSociedad)
      .add("codigoNegocio", codigoNegocio)
      .add("codigoSucursal", codigoSucursal)
      .add("recalada", recalada)
      .add("codigoSolicitante", codigoSolicitante)
      .add("codigoEstado", codigoEstado)
      .addDate("desde", desde)
      .addDate("hasta", hasta)
      .add("startAt", startAt)
      .add("maxResult", maxResult)
      .build();

      return this.httpClientService
        .get(this.buildUrl(`solicitud`+query), 
             new HttpParams(), 
             progress, 
             handlerEnable)
  }
  public export(codigoSociedad: any, 
    codigoNegocio: any, 
    codigoSucursal: any, 
    recalada: any,
    codigoSolicitante: any,
    codigoEstado:any,
    desde: any,
    hasta: any,
    progress:boolean=false){
      const query = new QueryStringBuilder()
      .add("codigoSociedad", codigoSociedad)
      .add("codigoNegocio", codigoNegocio)
      .add("codigoSucursal", codigoSucursal)
      .add("recalada", recalada)
      .add("codigoSolicitante", codigoSolicitante)
      .add("codigoEstado", codigoEstado)
      .addDate("desde", desde)
      .addDate("hasta", hasta)
      
      .build();
      return this.httpClientService.getBlob(this.buildUrl(`solicitud/export`+query), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "solicitudesServicio.xlsx"
            }
        }));
  }
  public get(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
    const u= this.buildUrl(`solicitud/${id}`)
    return this
          .httpClientService
          .get(u,new HttpParams(),  progress, handlerEnable);
  }
  public getPreComprobanteById(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
    const u= this.buildUrl(`solicitud/preComprobante/${id}`)
    return this
          .httpClientService
          .get(u,new HttpParams(),  progress, handlerEnable);
  }

  public create(body:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
    const u= this.buildUrl(`solicitud`)
    return this
          .httpClientService
          .post(u,body, {},  progress, handlerEnable);
  }
  public update(id:any, body:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
    const u= this.buildUrl(`solicitud/${id}`)
    return this
          .httpClientService
          .put(u, body, progress, handlerEnable);
  }

  public anular(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
    const u= this.buildUrl(`solicitud/${id}/anular`)
    return this
          .httpClientService
          .patch(u, {}, progress, handlerEnable);
  }

  public searchKO(codigoCliente: any, codigoSociedad: any, startAt: any, maxResult: any, 
          progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
    const query = new QueryStringBuilder()
    .add("codigoSociedad", codigoSociedad)
    .add("codigoCliente", codigoCliente)
    .add("startAt", startAt)
    .add("maxResult", maxResult)
    .build();

    return this.httpClientService
        .get(this.buildUrl(`solicitud/ko`+query), 
             new HttpParams(), 
             progress, 
             handlerEnable)
  }

  public getCondicionesPagos(codigoSociedad: any, codigoNegocio: any, codigoCliente: any,progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
    const u= this.buildUrl(`solicitud/condicionPago?codigoSociedad=${codigoSociedad}&codigoNegocio=${codigoNegocio}&codigoCliente=${codigoCliente}`)
    return this
          .httpClientService
          .get(u, new HttpParams(), progress, handlerEnable);
  }

  public getTarifas(codigoSociedad: any, 
    codigoNegocio: any, 
    codigoServicio: any, 
    codigoSucursal: any, 
    nombre: any){
    const u= this.buildUrl(`solicitud/tarifaSucursal?codigoSociedad=${codigoSociedad}&codigoNegocio=${codigoNegocio}&codigoServicio=${codigoServicio}&codigoSucursal=${codigoSucursal}&nombre=${nombre}`)
    return this
          .httpClientService
          .get(u);
  }

  public getServicios(codigoSociedad: any, 
    codigoNegocio: any, 
    nombre: any){
    const u= this.buildUrl(`solicitud/servicio?codigoSociedad=${codigoSociedad}&codigoNegocio=${codigoNegocio}&nombre=${nombre}`)
    return this
          .httpClientService
          .get(u);
  }
  public getPreComprobante(ids:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false ){
    const u= this.buildUrl(`solicitud/obtenerPreComprobante`)
    return this
          .httpClientService
          .post(u, ids, {}, progress, handlerEnable);
  }

  public generarPreFactura(body:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
    const u = this.buildUrl(`solicitud/generar`)
    return this
          .httpClientService
          .post(u, body, {},  progress, handlerEnable);
  }

  public getConcesionTarifa(id:any, codigoDestinatario:any, codigoResponsablePago: any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
    const query = new QueryStringBuilder()
    .add("codigoDestinatario", codigoDestinatario)
    .add("codigoResponsablePago", codigoResponsablePago)
    .build();

    return this.httpClientService
        .get(this.buildUrl(`solicitud/solicitudTarifa/${id}`+query), 
             new HttpParams(), 
             progress, 
             handlerEnable)
  }
}