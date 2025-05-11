import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { map, timestamp } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DireccionamientoService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.direccionamiento;
    }

    private ToDate(value: string): any | Date {
        if (value)
            return formatDate((new Date(value)), 'yyyy-MM-dd', 'en-US');

        return null;
    }

    public getBy(solicitud: string,
        bl: string,
        codigoNave: string,
        viaje: string,
        codigoCliente: string,
        codigoSucursal: string,
        codigoEstado: number,
        username: string,
        desde: Date,
        hasta: Date,
        startAt: number,
        maxResult: number, progress: boolean = false): Observable<any> {

        
        const query = new QueryStringBuilder()
                    .add("solicitud", solicitud)
                    .add("codigoSucursal", codigoSucursal)
                    .add("bl", bl)
                    .add("codigoNave", codigoNave)
                    .add("viaje", viaje)
                    .add("codigoCliente", codigoCliente)
                    .add("codigoEstado", codigoEstado)
                    .add("username", username)
                    .addDate("desde", desde)
                    .addDate("hasta", hasta)
                    .add("startAt", startAt)
                    .add("maxResult", maxResult)
                    .build(true);
     
        return this.httpClientService
            .get(this.buildUrl(`Direccionamiento/Direccionamientos${query}`)
                , new HttpParams(), progress)
            .pipe(map(x => {
                if (x.direccionamientoList) {
                    x.direccionamientoList.forEach((element: any) => {
                        element.registrado = this.ToDate(element.registrado);
                    });
                }
                return x;
            }));
    }

    public getByIdHistorial(idDireccionamiento: any): Observable<any> {
        return this.httpClientService
            .get(this.buildUrl(`Direccionamiento/DireccionamientoHistorial/${idDireccionamiento}`)
                , new HttpParams())
            .pipe(map(x => {
                if (x.direccionamientoHistorialList) {
                    x.direccionamientoHistorialList.forEach((element: any) => {
                    });
                }
                return x;
            }));
    }

    public getSearchDownload(solicitud: string,
        bl: string,
        codigoNave: string,
        viaje: string,
        codigoCliente: string,
        codigoSucursal: string,
        codigoEstado: number,
        username: string,
        desde: Date,
        hasta: Date, progress: boolean = false): Observable<any> {

            const query = new QueryStringBuilder()
            .add("solicitud", solicitud)
            .add("codigoSucursal", codigoSucursal)
            .add("bl", bl)
            .add("codigoNave", codigoNave)
            .add("viaje", viaje)
            .add("codigoCliente", codigoCliente)
            .add("codigoEstado", codigoEstado)
            .add("username", username)
            .addDate("desde", desde)
            .addDate("hasta", hasta)
            .build(true);
        
        return this.httpClientService
        .getBlob( this.buildUrl(`Direccionamiento/ExportDireccionamientos${query}`), progress)
        .pipe(map((r:any)=>{
            return {
                content: this.mapBold(r.body),
                filename: "direccionamiento.xlsx"
            }    
        }));
    }

    public getById(idDireccionamiento: any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`Direccionamiento/${idDireccionamiento}`),new HttpParams(), progress, handlerEnable);
    }

    public Editar(request: any, progress: boolean = false): Observable<any> {
        return this.httpClientService.post(this.buildUrl(`Direccionamiento/editar`), request, progress);
    }

    public Create(request: any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false): Observable<any> {
        
        return this.httpClientService.post(this.buildUrl(`Direccionamiento/DireccionamientoCreate`), request, {}, progress, handlerEnable);

    }

    public anular(request: any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false) {
        return this.httpClientService.post(this.buildUrl(`Direccionamiento/cancel`), request, {}, progress, handlerEnable);
    }

    public aprobar(request: any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false) {
        return this.httpClientService.post(this.buildUrl(`Direccionamiento/aprobar`), request, {}, progress, handlerEnable);
    }
}