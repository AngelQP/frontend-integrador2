import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment }from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class ConcesionService extends ApiBaseService {
  constructor(private httpClientService: HttpClientService) 
  { 
      super();
      this.endpoint = environment.endpoint.concesiones;
  }

  
  public searchAprobador(usuario:any, startAt:any, maxResult:any, progress:boolean=false, 
    handlerEnable: boolean|ServerErrorAction=false){
      const query = new QueryStringBuilder()
      .add("usuario",usuario)
      .add("acceso",7)
      .add("startAt", startAt)
      .add("maxResult", maxResult)
      .build(true);

      return this
            .httpClientService
            .get(this.buildUrl(`concesion/Concesionesaprobador${query}`), 
                                new HttpParams(), progress, handlerEnable);
  }
  public search(codigoSociedad: any, 
                codigoNegocio:any, 
                codigoSucursal:any, 
                codigoDestinatario:any,
                codigoResponsable:any, 
                codigoEstado:any,
                desde:any, hasta:any, startAt:any, maxResult:any, progress:boolean=false, 
                handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
    const query = new QueryStringBuilder()
    .add("codigoSociedad", codigoSociedad)
    .add("codigoNegocio", codigoNegocio)
    .add("codigoSucursal", codigoSucursal)
    .add("codigoDestinatario", codigoDestinatario)
    .add("codigoResponsable", codigoResponsable)
    .add("codigoEstado", codigoEstado)
    .addDate("desde", desde)
    .addDate("hasta", hasta)
    .add("startAt", startAt)
    .add("maxResult", maxResult)
    .build(true);

    return this
            .httpClientService
            .get(this.buildUrl(`concesion/concesiones${query}`), 
                                new HttpParams(), progress, handlerEnable);
  }
  public download(codigoSociedad: any, 
    codigoNegocio:any, 
    codigoSucursal:any, 
    codigoDestinatario:any,
    codigoResponsable:any,
    codigoEstado:any,
    desde:any, 
    hasta:any, 
    progress:boolean=false, 
    handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
    const query = new QueryStringBuilder()
    .add("codigoSociedad", codigoSociedad)
    .add("codigoNegocio", codigoNegocio)
    .add("codigoSucursal", codigoSucursal)
    .add("codigoDestinatario", codigoDestinatario)
    .add("codigoResponsable", codigoResponsable)
    .add("codigoEstado", codigoEstado)
    .addDate("desde", desde)
    .addDate("hasta", hasta)
    .build(true);
    const url = this.buildUrl(`concesion/exportConcesiones${query}`)
    return this
            .httpClientService
            .getBlob(url, progress, handlerEnable)
            .pipe(map( (r:any) => {
                return {
                    content: this.mapBold(r.body),
                    filename: "concesiones.xlsx"
                }    
            }));
    
  }

  public crearConcesion(
    request:any, 
    progress:boolean=false, 
    handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
      return this
            .httpClientService
            .post(this.buildUrl("concesion"),request,{ }, progress, handlerEnable)
  }

  public updateConcesion(
    request:any, 
    progress:boolean=false, 
    handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
      return this
            .httpClientService
            .patch(this.buildUrl("concesion"),request, progress, handlerEnable)
  }

  public anluar(id:any, progress:boolean=false, 
    handlerEnable: boolean|ServerErrorAction=false){
      return this
            .httpClientService
            .patch(this.buildUrl(`concesion/${id}/anular`),{} , progress, handlerEnable)
  }
  public rechazar(id:any, request:any, progress:boolean=false, 
    handlerEnable: boolean|ServerErrorAction=false){
      return this
      .httpClientService
      .patch(this.buildUrl(`concesion/${id}/rechazar`),request, progress, handlerEnable)
  }
  public aprobar(id:any, progress:boolean=false, 
    handlerEnable: boolean|ServerErrorAction=false){
      return this
      .httpClientService
      .patch(this.buildUrl(`concesion/${id}/aprobar`),{} , progress, handlerEnable)
  }
  public enviarParaAprobar(id:any, progress:boolean=false, 
    handlerEnable: boolean|ServerErrorAction=false){
      return this
      .httpClientService
      .patch(this.buildUrl(`concesion/${id}/enaprobacion`),{} , progress, handlerEnable)
  }
  public caducar(id:any,request:any, progress:boolean=false, 
    handlerEnable: boolean|ServerErrorAction=false){
      return this
      .httpClientService
      .patch(this.buildUrl(`concesion/${id}/caducar`),request, progress, handlerEnable)
  }
  public get(id:any, progress:boolean=false, 
    handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
    return this
            .httpClientService
            .get(this.buildUrl(`concesion/${id}`),new HttpParams(), progress, handlerEnable)
  }

  public getTarifas(codigoSociedad: any, codigoNegocio:any, codigoSucursal:any, codigoServicio:any, nombre:any):Observable<any[]>{
    const query = new QueryStringBuilder()
    .add("codigoSociedad", codigoSociedad)
    .add("codigoNegocio", codigoNegocio)
    .add("codigoSucursal", codigoSucursal)
    .add("codigoServicio", codigoServicio)
    .add("nombre", nombre)
    .build(true);

    return this
           .httpClientService
           .get(this.buildUrl(`concesion/tarifas${query}`), 
                                 new HttpParams());
  }

  public getServicios(codigoSociedad: any, codigoNegocio:any, nombre:any):Observable<any[]>{
    const query = new QueryStringBuilder()
    .add("codigoSociedad", codigoSociedad)
    .add("codigoNegocio", codigoNegocio)
    .add("nombre", nombre)
    .build(true);

    return this
           .httpClientService
           .get(this.buildUrl(`concesion/Servicios${query}`), 
                                 new HttpParams());
  }
}