import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { map, timestamp } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class BloqueoService extends ApiBaseService {

    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.emisionbl;
    }
    public searchBls(bl:any, codigoEstado:any, startAt:number, maxResult:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
            const query = new QueryStringBuilder()
            .add("bl", bl)
            .add("codigoEstado", codigoEstado)
            .add("startAt", startAt)
            .add("maxResult", maxResult)
            .build();
        return this.httpClientService.get(this.buildUrl(`bloqueo/bls`+query), new HttpParams(), progress, handlerEnable);
    }
    public downloadBlsActivos(progress:boolean=false):Observable<any>{
        return this.httpClientService
        .getBlob(this.buildUrl(`Bloqueo/bl/Activos`), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "blsactivos.xlsx"
            }
        }));
    }
    public searchRolCliente(clientName:any, codigoEstado:any, startAt:number, maxResult:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
            const query = new QueryStringBuilder()
            .add("cliente", clientName)
            .add("codigoEstado", codigoEstado)
            .add("startAt", startAt)
            .add("maxResult", maxResult)
            .build();

            return this.httpClientService.get(this.buildUrl(`bloqueo/clientes`+query), new HttpParams(), progress, handlerEnable);
    }
    public downloadRolesClienteActivos(progress:boolean=false):Observable<any>{
        return this.httpClientService
        .getBlob(this.buildUrl(`Bloqueo/cliente/Activos`), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "rolesclientesactivos.xlsx"
            }
        }));
    }
    public getBls(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.get(this.buildUrl(`Bloqueo/bl/${id}`), new HttpParams(), progress, handlerEnable);
    }
    public getRolCliente(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.get(this.buildUrl(`Bloqueo/cliente/${id}`), new HttpParams(), progress, handlerEnable);
    }
    createBloqueoBL(request:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.post(this.buildUrl(`Bloqueo/BL`), request, {}, progress, handlerEnable);
    }
    updateBloqueoBL(request:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl(`Bloqueo/BL`), request,  progress, handlerEnable);
    }

    createBloqueoRolCliente(request:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.post(this.buildUrl(`Bloqueo/cliente`), request, {}, progress, handlerEnable);
    }

    updateBloqueoRolCliente(request:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl(`Bloqueo/cliente`), request,  progress, handlerEnable);
    }
    public downloadHistorialBloqueoCliente(id:any, progress:boolean=false){
        return this.httpClientService
        .getBlob(this.buildUrl(`Bloqueo/cliente/${id}/Historial`), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "LOG_CLIENTE.xlsx"
            }
        }));
    }



    public disabledClienteRol(id:any,progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl(`Bloqueo/cliente/${id}/Desactivar`), {}, progress, handlerEnable);
    }
    public enableClienteRol(id:any,progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl(`Bloqueo/cliente/${id}/Activar`), {}, progress, handlerEnable);
    }

    public disabledBl(id:any,progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl(`Bloqueo/bl/${id}/Desactivar`), {}, progress, handlerEnable);
    }
    public enableBl(id:any,progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.patch(this.buildUrl(`Bloqueo/bl/${id}/Activar`), {}, progress, handlerEnable);
    }
    public downloadHistorialBloqueoBL(id:any, progress:boolean=false){
        return this.httpClientService
        .getBlob(this.buildUrl(`Bloqueo/bl/${id}/Historial`), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "LOG_BL.xlsx"
            }
        }));
    }

    public bulkBloqueoBLFile(idFile: any, progress:boolean){
        return this.httpClientService
            .post(this.buildUrl(`Bloqueo/bulk/bloqueobl/${idFile}`),undefined,{},progress);
    }

    public bulkBloqueoClientFile(idFile: any, progress:boolean){
        return this.httpClientService
            .post(this.buildUrl(`Bloqueo/bulk/bloqueoclient/${idFile}`),undefined,{},progress);
    }
}