import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';


@Injectable()
export class ServiciosKNService extends ApiBaseService{

    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.servicioskn;
    }
    private ToDate(value:string):any|Date{
        if (value)
        return new Date(value);
    return null;
    }
    public searchSolicitudesServicios(
        codigoCliente:any, codigoSucrusal:any, bl:any,  
        contenedor:any, nroLiquidacion:any,
        codigoEstado:any, desde:any, hasta:any, startAt:number, maxResult:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
        
        const query = new QueryStringBuilder()
        .add("codigoCliente", codigoCliente)
        .add("codigoSucrusal", codigoSucrusal)
        .add("bl", bl)
        .add("contenedor", contenedor)
        .add("nroLiquidacion", nroLiquidacion)
        .add("codigoEstado", codigoEstado)
        .addDate("desde", desde)
        .addDate("hasta", hasta)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();

        return this.httpClientService
        .get(this.buildUrl(`servicioKN/solicitudes`+query), new HttpParams(), progress, handlerEnable);
    }
    public downloadSearch(codigoCliente:any, codigoSucrusal:any, bl:any,  
        contenedor:any, nroLiquidacion:any,
        codigoEstado:any, desde:any, hasta:any, progress:boolean=false){
        
            const query = new QueryStringBuilder()
        .add("codigoCliente", codigoCliente)
        .add("codigoSucrusal", codigoSucrusal)
        .add("bl", bl)
        .add("contenedor", contenedor)
        .add("nroLiquidacion", nroLiquidacion)
        .add("codigoEstado", codigoEstado)
        .addDate("desde", desde)
        .addDate("hasta", hasta)
        .build();

        return this.httpClientService.getBlob(this.buildUrl(`servicioKN/solicitudesexport`+query), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "solicitudes.xlsx"
            }
        }))
    }

    public getSolicitudServicio(id:any,progress:boolean=false): Observable<any>{
        return this.httpClientService.get(this.buildUrl(`servicioKN/solicitud/${id}`),new HttpParams(), progress)
        .pipe(map((r:any)=>{
            const items = r.items.map((item:any)=>{
                item.aprobado = this.ToDate(item.aprobado);
                item.fechaRegistro = this.ToDate(item.fechaRegistro);
                
                item.pagos = item.pagos.map((p:any)=>{
                    p.fechaOperacion = this.ToDate(p.fechaOperacion);
                    p.fechaOperacionAdmin = this.ToDate(p.fechaOperacionAdmin);
                    return p;
                })

                item.servicios = item.servicios.map((p:any)=>{
                    p.fechaDevolucion = this.ToDate(p.fechaDevolucion);
                    return p;
                })

                return item
            })
            return { items } 
        }));
    }

    public createSolicitudServicio(payload:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
        return this.httpClientService.post(this.buildUrl(`servicioKN/SolicitudServicio`),payload, {}, progress, handlerEnable);
    }

    public updateSolicitudServicio(payload:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
        return this.httpClientService.patch(this.buildUrl(`servicioKN/SolicitudServicio`),payload, progress, handlerEnable);
    }

    public aprobar(id:any, payload:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl(`servicioKN/solicitud/${id}/aprueba`),payload, progress, handlerEnable);
    }

    public rechazar(id:any, comment:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl(`servicioKN/solicitud/${id}/rechaza`),{observacion:comment}, progress, handlerEnable);
    }

    public anula(id:any, comment:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl(`servicioKN/solicitud/${id}/anula`),{observacion:comment}, progress, handlerEnable);
    }

    public calcula(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.post(this.buildUrl(`servicioKN/calcula?id=${id}`),{},{}, progress, handlerEnable);
    }

}