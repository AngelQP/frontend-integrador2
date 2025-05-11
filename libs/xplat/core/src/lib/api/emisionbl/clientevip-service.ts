import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { map, timestamp } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ClienteVipService extends ApiBaseService {

    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.emisionbl;
    }

    public search(clientlike:any, startAt:number, maxResult:any,
        progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        
        const query = new QueryStringBuilder()
        .add("cliente", clientlike)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();

        return this.httpClientService
        .get(this.buildUrl(`Exonerado/Exonerados`+query), new HttpParams(), progress, handlerEnable);
    }
    public downloadActivos(progress:boolean=false){
        return this.httpClientService
        .getBlob(this.buildUrl(`Exonerado/ExoneradosActivos`), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "activos.xlsx"
            }
        }));
    }
    public downloadHistory(id:any,progress:boolean=false){
        return this.httpClientService
        .getBlob(this.buildUrl(`Exonerado/Historial/${id}`), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "log.xlsx"
            }
        }));
    }

    public disabled(id:any, progress?:boolean, handlerEnable?:boolean|ServerErrorAction){
        return this.httpClientService.patch(this.buildUrl(`Exonerado/${id}/desactivar`), {}, progress, handlerEnable);
    }
    public enable(id:any, progress?:boolean, handlerEnable?:boolean|ServerErrorAction){
        return this.httpClientService.patch(this.buildUrl(`Exonerado/${id}/activar`), {}, progress, handlerEnable);
    }

    public create(request: any, progress?:boolean, handlerEnable?:boolean):Observable<any>{
        return this.httpClientService.post(this.buildUrl(`Exonerado/exonerado`), request, {}, progress, handlerEnable);
    }
   

    public change(request:any, progress?:boolean, handlerEnable?:boolean):Observable<any>{
        return this.httpClientService.patch(this.buildUrl(`Exonerado/exonerado`), request,  progress, handlerEnable);
    }
}