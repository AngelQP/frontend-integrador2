import { Injectable } from "@angular/core";
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ComprobanteService extends ApiBaseService{ 
    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.liquidacion;
    }

    public searchComprobantes(bl:any, contenedor:any,  recalada:any, documento:any
        , serie:any, numero:any, desde:any, hasta:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const query = new QueryStringBuilder()
        .add("bl", bl)
        .add("contenedor", contenedor)
        .add("recalada", recalada)
        .add("documento", documento)
        .add("serie", serie)
        .add("numero", numero)
        .addDate("desde",desde)
        .addDate("hasta", hasta)
        .build();
        const url = this.buildUrl(`Comprobante/Comprobantes${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
        
    }
    public eliminar(id:any,progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        const url = this.buildUrl(`Comprobante/Delete/${id}`)
        return this
                .httpClientService
                .delete(url, new HttpParams(), progress, handlerEnable)
    }

    public generar(request:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        return this
                .httpClientService
                .post(this.buildUrl(`Comprobante/ImportarManual`), request, {}, progress, handlerEnable)
    }

    public importComprobantes(file: any, progress:boolean){
        const formData = new FormData();
        formData.append("file", file);
        return this.httpClientService.post(this.buildUrl(`Comprobante/ImportarComprobantes`), formData, {}, progress);
    }


    public searchTicket(ticket:any, desde:any, hasta:any, startAt:any, maxResult:any,progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const query = new QueryStringBuilder()
        .add("ticket", ticket)
        .addDate("desde",desde)
        .addDate("hasta", hasta)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();
        const url = this.buildUrl(`comprobante/Tickets${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
    public getTicket(id:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const url = this.buildUrl(`comprobante/Ticket/${id}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
    public getFormato(progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        const url = this.buildUrl(`comprobante/FormatoExcel`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
    }
}