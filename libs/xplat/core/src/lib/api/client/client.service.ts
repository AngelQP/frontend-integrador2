import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ClientService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.client;
    }

    private ToDate(value: string): any | Date {
        if (value)
            return formatDate((new Date(value)), 'yyyy-MM-dd', 'en-US');

        return null;
    }

    public getBy(razonSocial: string,
        nroDocumento: string,
        estado: string,
        startAt: number,
        maxResult: number ,progress:boolean=false): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`Client/SolicitudGetBy?razonSocial=${razonSocial}&nroDocumento=${nroDocumento}&estado=${estado}&startAt=${startAt}&maxResult=${maxResult}`),new HttpParams(),progress)
            .pipe(map(x => {
                if (x.solicitudList) {
                    x.solicitudList.forEach((element: any) => {
                        element.fechaRegistro = this.ToDate(element.fechaRegistro);
                        element.fechaActualizacion = this.ToDate(element.fechaActualizacion);
                    });
                }
                return x;
            }));
    }

    public getByUrlDownload(
        razonSocial: string,
        nroDocumento: string,
        estado: string,
        progress: boolean = false): Observable<any> {

            const query = new QueryStringBuilder()
            .add("razonSocial", razonSocial)
            .add("nroDocumento", nroDocumento)
            .add("estado", estado)
            .build(true);

        return  this.httpClientService
        .getBlob(this.buildUrl(`Client/ExportSolicitudGetBy${query}`), progress)
        .pipe(map( (r:any) => {
            return {
                content: this.mapBold(r.body),
                filename: "Solicitud.xlsx"
            }    
        }));
        
    }

    public getRoles() {
        this.httpClientService.get(this.buildUrl(`Master/Roles`))

    }
    public getById(idSolicitudCuenta: any,progress: boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`Client/SolicitudGetById?idSolicitudCuenta=${idSolicitudCuenta}`), new HttpParams(), progress, handlerEnable)

    }

    public aprobar(request: any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false) {
        // {
        //     "idSolicitud": 0,
        //     "rolList": [
        //       "string"
        //     ]
        // }
        return this.httpClientService.post(this.buildUrl(`Client/AprobarSolicitud`), request, {}, progress, handlerEnable)

    }

    public rechazar(request: any, progress: boolean = false) {
        // {
        //     "idSolicitudCuenta": 0,
        //     "codigoMotivo": "string",
        //     "observacion": "string"
        // }
        return this.httpClientService.post(this.buildUrl(`Client/RechazarSolicitud`), request, {}, progress)

    }



    public search(nombreCliente:any, tipoDocumento:any, numeroDocumento:any,codigoPais:any, startAt:any, maxResult:any, progress: boolean = false): Observable<any>{
        const query = new QueryStringBuilder()
            .add("cliente", nombreCliente)
            .add("tipoDocumento", tipoDocumento)
            .add("numeroDocumento", numeroDocumento)
            .add("codigoPais", codigoPais)
            .add("startAt", startAt)
            .add("maxResult", maxResult)
            .build(true);

            return this.httpClientService.get(this.buildUrl(`Client/Clientes${query}`),new HttpParams(),progress)
    }

    public downloadSearch(nombreCliente:any, tipoDocumento:any, numeroDocumento:any,codigoPais:any, progress:boolean=false): Observable<any>{
        const query = new QueryStringBuilder()
            .add("cliente", nombreCliente)
            .add("tipoDocumento", tipoDocumento)
            .add("numeroDocumento", numeroDocumento)
            .add("codigoPais", codigoPais)
            
            .build(true);

            return this.httpClientService.getBlob(this.buildUrl(`client/ClientesExport${query}`),progress)
            .pipe(map( (r: any) => {
                return {
                    content: this.mapBold(r.body),
                    filename: "clientes.xlsx"
                }
            }));
    }

    public get(id:any, progress: boolean = false): Observable<any>{
        return  this.httpClientService.get(this.buildUrl(`Client/Cliente/${id}`),new HttpParams(),progress)
    }

    public create(request: any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.post(this.buildUrl("client/Cliente"), request,{}, progress, handlerEnable)
    }

    public update(request: any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl("client/cliente"), request, progress, handlerEnable)
    }

    public delete(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl(`Client/Cliente/${id}/Delete`), {}, progress, handlerEnable)
    }

    public getDireccionSunat(ruc:any, progress: boolean = false): Observable<any>{
        return  this.httpClientService.get(this.buildUrl(`Client/ObtenerClienteSunat/${ruc}`),new HttpParams(),progress)
    }
}