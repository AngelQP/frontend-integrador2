import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { map, timestamp } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class EmisionBLService extends ApiBaseService {

    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.emisionbl;
    }

    public search(codigoCliente:any, codigoSucursal:any, bl:any,  
        codigoEstado:any, desde:any, hasta:any, startAt:number, maxResult:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        
        const query = new QueryStringBuilder()
        .add("codigoCliente", codigoCliente)
        .add("codigoSucursal", codigoSucursal)
        .add("numeroBL", bl)
        .add("codigoEstado", codigoEstado)
        .addDate("desde", desde)
        .addDate("hasta", hasta)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();

        return this.httpClientService
        .get(this.buildUrl(`EntregaBL/EmisionBL`+query), new HttpParams(), progress, handlerEnable);
    }
    public downloadSearch(codigoCliente:any, codigoSucursal:any, bl:any,  
        codigoEstado:any, desde:any, hasta:any, progress:boolean=false){
        
            const query = new QueryStringBuilder()
        .add("codigoCliente", codigoCliente)
        .add("codigoSucursal", codigoSucursal)
        .add("numeroBL", bl)
        .add("codigoEstado", codigoEstado)
        .addDate("desde", desde)
        .addDate("hasta", hasta)
        .build();

        return this.httpClientService.getBlob(this.buildUrl(`EntregaBL/EmisionBLExport`+query), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "emisiones.xlsx"
            }
        }))
    }

    public getEmision(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService
        .get(this.buildUrl(`EntregaBL/${id}`), new HttpParams(), progress, handlerEnable);
    }
    public downloadHistorialEmision(id:any, progress:boolean=false){
        return this.httpClientService
        .getBlob(this.buildUrl(`EntregaBL/Historial/${id}`), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "historial.xlsx"
            }
        }));
    }

    public getPago(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService
        .get(this.buildUrl(`EntregaBL/Pago/${id}`), new HttpParams(), progress, handlerEnable);
    }

    public create(request: any, progress?:boolean, handlerEnable?:boolean):Observable<any>{
        return this.httpClientService.post(this.buildUrl(`EntregaBL/Registro`), request, {}, progress, handlerEnable);
    }

    public change(request: any, progress?:boolean, handlerEnable?:boolean|ServerErrorAction):Observable<any>{
        return this.httpClientService.patch(this.buildUrl(`EntregaBL/Registro`), request, progress, handlerEnable);
    }

    public aprobar(id:any,correo:any, progress?:boolean, handlerEnable?:boolean|ServerErrorAction){
        const query = new QueryStringBuilder()
        .add("correo", correo)
        .build(true);
        return this.httpClientService.patch(this.buildUrl(`EntregaBL/${id}/aprobado${query}`), {}, progress, handlerEnable);
    }
    public observado(id:any,correo:any, comentario:any, progress?:boolean, handlerEnable?:boolean|ServerErrorAction){
        const query = new QueryStringBuilder()
        .add("correo", correo)
        .add("observacion", comentario)
        .build(true);
        return this.httpClientService.patch(this.buildUrl(`EntregaBL/${id}/observado${query}`), {}, progress, handlerEnable);
    }
    public anulado(id:any, progress?:boolean, handlerEnable?:boolean|ServerErrorAction){
        return this.httpClientService.patch(this.buildUrl(`EntregaBL/${id}/anulado`), {}, progress, handlerEnable);
    }
}