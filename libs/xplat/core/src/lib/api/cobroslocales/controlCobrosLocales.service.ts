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
export class ControlCobrosLocalesService extends ApiBaseService{
    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.cobroslocales;
    }
    public getPeriods(){
        const date = new Date()
        const current = date.getFullYear();
        return R.map(x=>{return {code:x}}, R.range(current-1, current+10))

    }
    public getMonths() {
        return R.map(month => { return { code: month } }, R.range(1, 13));
    }
    public getWeeks(){
        return R.map(x=>{return {codigo:x}}, R.range(1, 53))
    }

    public searchLiquidacion(periodo:any, tipo:any, mes:any, semana:any,  startAt:any, maxResult:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const query = new QueryStringBuilder()
        .add("periodo", periodo)
        .add("tipo", tipo)
        .add("mes", mes)
        .add("semana", semana)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();
        const url = this.buildUrl(`cobroslocales/liquidaciones${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)

    }

    public downloadLiquidacion(periodo:any, semana:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{

        const query = new QueryStringBuilder()
        .add("periodo", periodo)
        .add("semana", semana)
        .build();
        const url = this.buildUrl(`cobroslocales/liquidaciones/exportar${query}`)

        return this.httpClientService
        .getBlob(url, progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "liquidaciones.xlsx"
            }
        }))
    }
    public getLiquidacion(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const url = this.buildUrl(`cobroslocales/liquidacion/${id}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
    public saveLiquidacion(request:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        return this
                .httpClientService
                .post(this.buildUrl(`cobroslocales/liquidacion`), request, {}, progress, handlerEnable)
    }
    public searchSinFacturacion(codigoSucursal:any, bl:any, desde:any, hasta:any, startAt:any, maxResult:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const query = new QueryStringBuilder()
        .add("codigoSucursal", codigoSucursal)
        .add("bl", bl)
        .addDate("desde",desde)
        .addDate("hasta", hasta)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();
        const url = this.buildUrl(`cobroslocales/liquidaciones/sin-factura${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
    public downloadSinFacturacion(codigoSucursal:any, bl:any, desde:any, hasta:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        const query = new QueryStringBuilder()
        .add("codigoSucursal", codigoSucursal)
        .add("bl", bl)
        .addDate("desde",desde)
        .addDate("hasta", hasta)
        .build();
        const url = this.buildUrl(`cobroslocales/liquidaciones/sin-factura/exportar${query}`)
        return this.httpClientService
        .getBlob(url, progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "sinfacturas.xlsx"
            }
        }))
    }
    public searchConFacturacion(codigoSucursal:any, bl:any,filtro:any, desde:any, hasta:any, startAt:any, maxResult:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const query = new QueryStringBuilder()
        .add("codigoSucursal", codigoSucursal)
        .add("bl", bl)
        .add("filtro",filtro)
        .addDate("desde",desde)
        .addDate("hasta", hasta)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();
        const url = this.buildUrl(`cobroslocales/liquidaciones/con-factura${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
    public getConFacturacion(
        codigoSucursal :any,
        bl :any,
        nave: any,
        viaje: any,
        etd: any,
        // contenedor :any,
        // codigoServicio :any,
        // codigoMoneda :any,
        progress: boolean=false,
        handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        //const url = this.buildUrl(`cobroslocales/liquidacion/con-factura/${codigoSucursal}/${bl}`)
        const url = this.buildUrl(`cobroslocales/liquidacion/con-factura/${codigoSucursal}/${bl}/${nave}/${viaje}/${etd}`)
            return this
                    .httpClientService
                    .get(url, new HttpParams(), progress, handlerEnable)
    }


    public downloadConFacturacion(codigoSucursal:any, contenedor:any, filtro:any, desde:any, hasta:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        const query = new QueryStringBuilder()
        .add("codigoSucursal", codigoSucursal)
        .add("contenedor", contenedor)
        .add("filtro",filtro)
        .addDate("desde",desde)
        .addDate("hasta", hasta)
        .build();
        const url = this.buildUrl(`cobroslocales/liquidaciones/con-factura/exportar${query}`)
        return this.httpClientService
        .getBlob(url, progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "confacturas.xlsx"
            }
        }))
    }

    public getFacturasIdFileBlob(request:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const url = this.buildUrl(`cobroslocales/Liquidacion/Facturas/`)
        return this
                .httpClientService
                .post(url, request, {}, progress, handlerEnable)
    }
}
