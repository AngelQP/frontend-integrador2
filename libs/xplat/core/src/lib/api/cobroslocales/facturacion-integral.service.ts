import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import * as R from 'ramda';
import { formatDate } from '@angular/common';
import { map } from 'rxjs/operators';

@Injectable()
export class FacturacionIntegralService extends ApiBaseService{
  constructor(private httpClientService: HttpClientService) {
      super();
      this.endpoint = environment.endpoint.cobroslocales;
  }

  public search(fechaInicio:any, 
              fechaFin:any, 
              caja:string, 
              codigoCliente:any, startAt:any, maxResult:any,
              progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const query = new QueryStringBuilder()
        .addDate("fechaInicio", fechaInicio)
        .addDate("fechaFin", fechaFin)
        .add("caja", caja)
        .add("codigoCliente", codigoCliente)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();
        const url = this.buildUrl(`facturacionIntegral${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
  }
  
  public download(fechaInicio:any, 
    fechaFin:any, 
    caja:string, 
    codigoCliente:any,
    progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      const query = new QueryStringBuilder()
        .addDate("fechaInicio", fechaInicio)
        .addDate("fechaFin", fechaFin)
        .add("caja", caja)
        .add("codigoCliente", codigoCliente)
        .build();
      
        const url = this.buildUrl(`facturacionIntegral/exportar${query}`)
        return this.httpClientService
        .getBlob(url, progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "facturacion.xlsx"
            }
        }))
  }
  public cajas(progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
    const url = this.buildUrl(`facturacionIntegral/caja`)
    return this
    .httpClientService
    .get(url, new HttpParams(), progress, handlerEnable)
  }
  public generarPreFactura(request:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
    return this
            .httpClientService
            .post(this.buildUrl(`facturacionIntegral/generar/pre-factura`), request, {}, progress, handlerEnable)
  }
}
