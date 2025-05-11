import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class LiquidacionNaveService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.bancos;
    }

    public search(codigoSociedad:any, codigoSucursal:any, recalada:any, startAt:any, maxResult:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
        const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoSucursal", codigoSucursal)
        .add("recalada", recalada)
        
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();

        const url = this.buildUrl(`conciliacionBancaria/LiquidacionNave${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }

    public searchLiquidaciones(codigoSociedad:any, codigoSucursal:any, recalada:any, codigoMoneda:any, startAt:any, maxResult:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
        const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoSucursal", codigoSucursal)
        .add("recalada", recalada)
        .add("codigoMoneda", codigoMoneda)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();

        const url = this.buildUrl(`conciliacionBancaria/Liquidaciones${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
    public downloadLiquidaciones(codigoSociedad:any, codigoSucursal:any, recalada:any, codigoMoneda:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
        const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoSucursal", codigoSucursal)
        .add("recalada", recalada)
        .add("codigoMoneda", codigoMoneda)
        
        .build();

        const url = this.buildUrl(`conciliacionBancaria/ExportLiquidaciones${query}`)
        return this
                .httpClientService
                .getBlob(url, progress)
                .pipe(map( (r:any) => {
                    return {
                        content: this.mapBold(r.body),
                        filename: "liquidaciones.xlsx"
                    }    
                }));
    }

    public liquidar(payload:any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        return this.httpClientService.post(this.buildUrl('conciliacionBancaria/liquidarNave'), payload, {}, progress, handlerEnable)
    }

    public liquidar_v2(payload:any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        return this.httpClientService.post(this.buildUrl('conciliacionBancaria/Liquidacion'), payload, {}, progress, handlerEnable)
    }

    public getDatanewLiquidacion(codigoSociedad:any, codigoSucursal:any, recalada:any, codigoMoneda:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        
            const query = new QueryStringBuilder()
            .add("codigoSociedad", codigoSociedad)
            .add("codigoSucursal", codigoSucursal)
            .add("recalada", recalada)
            .add("codigoMoneda", codigoMoneda)
            .build();
    
            const url = this.buildUrl(`conciliacionBancaria/LiquidacionNave_v2${query}`)
            return this
                    .httpClientService
                    .get(url, new HttpParams(), progress, handlerEnable)
    }

    public getLiquidacion(id:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
        const url =this.buildUrl(`conciliacionBancaria/Liquidacion//${id}`)
        return    this
            .httpClientService
            .get(url, new HttpParams(), progress, handlerEnable)
    }
}