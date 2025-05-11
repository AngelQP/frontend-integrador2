import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment }from '../../environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class DesgloseService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) 
    { 
        super();
        this.endpoint = environment.endpoint.desglose;
    }

    private ToDate(value: string): any | Date {
        if (value)
            return formatDate((new Date(value)), 'yyyy-MM-dd', 'en-US');

        return null;
    }

    public blukFile(idFile: any, progress:boolean){
        return this.httpClientService
            .post(this.buildUrl(`Desglose/bulk/${idFile}`),undefined,{},progress);
    }
    public getBy(codigoSucursal: string,
        codigoCliente: string,
        bl: string,
        codigoEstado: string,
        desde: Date,
        hasta: Date,
        startAt: number,
        maxResult: number, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
            
            const builder = new QueryStringBuilder();
            const sDesde: string = builder.toDateStringUtcEncode(desde);
            const sHasta: string = builder.toDateStringUtcEncode(hasta);

            return this.httpClientService
            .get(this.buildUrl(`Desglose/Desgloses?codigoSucursal=${codigoSucursal}&codigoCliente=${codigoCliente}&bl=${bl}&codigoEstado=${codigoEstado}&desde=${sDesde}&hasta=${sHasta}&startAt=${startAt}&maxResult=${maxResult}`)
            , new HttpParams(), progress, handlerEnable)
                
    }

    // public getByUrlDownload(codigoSucursal: string,
    //     codigoCliente: string,
    //     bl: string,
    //     codigoEstado: string,
    //     desde: Date,
    //     hasta: Date,): string {
        
    //     const builder = new QueryStringBuilder();
    //     const sDesde: string = builder.toDateStringUtcEncode(desde);
    //     const sHasta: string = builder.toDateStringUtcEncode(hasta);

    //     return this.buildUrl(`Desglose/ExportDesgloses?codigoSucursal=${codigoSucursal}&codigoCliente=${codigoCliente}&bl=${bl}&codigoEstado=${codigoEstado}&desde=${sDesde}&hasta=${sHasta}`);
    // }

    public getByUrlDownload(
        codigoSucursal: string,
        codigoCliente: string,
        bl: string,
        codigoEstado: string,
        desde: Date,
        hasta: Date,
        progress: boolean = false): Observable<any> {
        
            const query = new QueryStringBuilder()
            .add("codigoSucursal", codigoSucursal)
            .add("codigoCliente", codigoCliente)
            .add("bl", bl)
            .add("codigoEstado", codigoEstado)
            .addDate("desde", desde)
            .addDate("hasta", hasta)
            .build(true);
            

        return this.httpClientService
        .getBlob(this.buildUrl(`Desglose/ExportDesgloses${query}`), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "Desglose.xlsx"
            }
        }))
    }

    public create(request: any, progress?:boolean, handlerEnable?:boolean):Observable<any>{
        return this.httpClientService.post(this.buildUrl(`desglose`), request, {}, progress, handlerEnable);
    }

    public change(request: any, progress?:boolean, handlerEnable?:boolean|ServerErrorAction):Observable<any>{
        return this.httpClientService.patch(this.buildUrl(`desglose`), request, progress, handlerEnable);
    }

    public getById(id: any, progress: boolean= false, handlerEnable?:boolean|ServerErrorAction){
        return this.httpClientService.get(this.buildUrl(`desglose/${id}`),  new HttpParams(), progress, handlerEnable)
        .pipe(map(x => {
            if(x.items){
                x.items.forEach((element: any) => {
                    element.registrado = this.ToDate(element.registrado);
                    element.actualizado = this.ToDate(element.actualizado);
                });
            }
            return x;
        }));
    }

    public inProcess(id: any, progress: boolean= false){
        return this.httpClientService.patch(this.buildUrl(`Desglose/${id}/inprocess`), progress);
    }

    public process(id: any, request: any, progress: boolean= false, handlerEnable?:boolean|ServerErrorAction){
        return this.httpClientService.patch(this.buildUrl(`Desglose/${id}/process`), request, progress);
    }

    public reject(id: any, request: any, progress: boolean= false, handlerEnable?:boolean|ServerErrorAction){
        return this.httpClientService.patch(this.buildUrl(`Desglose/${id}/reject`), request, progress, handlerEnable);
    }

    public cancel(id: any, progress: boolean= false, handlerEnable?:boolean|ServerErrorAction){
        return this.httpClientService.patch(this.buildUrl(`Desglose/${id}/cancel`),undefined, progress, handlerEnable);
    }
}