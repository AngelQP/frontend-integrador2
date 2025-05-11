import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { formatDate } from '@angular/common';


@Injectable()
export class ConciliacionBancariaService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.bancos;
    }

    public sustentoEstado(){
        return [
          {codigo:"1", estadoNombre:"Sí"},
          {codigo:"0", estadoNombre:"No"}
        ]
      }

    public search(codigoSociedad:string, codigoBanco:string, cuentaBancaria:string, codigoEstado:any,
                glosa:string,sustento:string,desde:Date, hasta:Date, startAt:number, maxResult:number,
                progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>
    {
        const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoBanco", codigoBanco)
        .add("cuentaBancaria", cuentaBancaria)
        .add("codigoEstado", codigoEstado)
        .add("glosa",glosa)
        .add("sustento", sustento)
        .addDate("desde", desde)
        .addDate("hasta", hasta)
        .add("startAt", startAt)
        .add("maxResult", maxResult)
        .build();
        const url = this.buildUrl(`conciliacionBancaria/MovimientosBancarios${query}`)
        return this
                .httpClientService
                .get(url, new HttpParams(), progress, handlerEnable)
                .pipe(map((r:any)=>{
                    if (r && r.movimientoBancarioList) r.fecha = this.ToDate(r.fecha)
                    return r;
                }))
    }

    public downloadSearch(codigoSociedad:any, codigoBanco:any, cuentaBancaria:any, codigoEstado:any,
        glosa:string,sustento:boolean, desde:Date, hasta:Date, progress: boolean = false){
        const query = new QueryStringBuilder()
        .add("codigoSociedad", codigoSociedad)
        .add("codigoBanco", codigoBanco)
        .add("cuentaBancaria", cuentaBancaria)
        .add("codigoEstado", codigoEstado)
        .add("glosa",glosa)
        .add("sustento", sustento)
        .addDate("desde", desde)
        .addDate("hasta", hasta)
        .build(true);

        return this.httpClientService
        .getBlob(this.buildUrl(`conciliacionBancaria/ExportMovimientosBancarios${query}`), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "extractoBancario.xlsx"
            }
        }))

    }

    public createMovimiento(payload:any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        return this.httpClientService.post(this.buildUrl('conciliacionBancaria/movimientoBancario'), payload, {}, progress, handlerEnable)
    }

    //Update
    public update(id:any, body:any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false){
        const u= this.buildUrl(`conciliacionBancaria/movimiento/${id}`)
        return this
              .httpClientService
              .put(u, body, progress, handlerEnable);
      }



    public bulkFile(idFile: any, progress:boolean){
        return this.httpClientService
            .post(this.buildUrl(`ConciliacionBancaria/bulk/${idFile}`), undefined, {}, progress);
    }
    public getMovimiento(id:any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.get(this.buildUrl(`conciliacionBancaria/movimientoBancario/${id}`), new HttpParams(), progress, handlerEnable);
    }
    public getMovimientov2(id:any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.get(this.buildUrl(`conciliacionBancaria/movimientoBancario_v2/${id}`), new HttpParams(), progress, handlerEnable);
    }

    public getSaldos (codigoSucursal:any, recalada:any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false){
        const query = new QueryStringBuilder()
        .add("codigoSucursal",codigoSucursal)
        .add("recalada", recalada)
        .build(true)

        return this.httpClientService.get(this.buildUrl(`conciliacionBancaria/Saldos${query}`), new HttpParams(), progress, handlerEnable);
    }
    public getDocuments (codigoCliente:any,codigoSucursal:any, recalada:any, codigoMoneda:any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false){
        const query = new QueryStringBuilder()
        .add("codigoCliente", codigoCliente)
        .add("codigoSucursal",codigoSucursal)
        .add("recalada", recalada)
        .add("codigoMoneda", codigoMoneda)

        .build(true)

        return this.httpClientService.get(this.buildUrl(`conciliacionBancaria/Documentos${query}`), new HttpParams(), progress, handlerEnable);
    }

    public procesar(payload:any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        return this.httpClientService.post(this.buildUrl('conciliacionBancaria/procesarMovimientoBancario'), payload, {}, progress, handlerEnable)
    }
    public procesarv2(payload:any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
        return this.httpClientService.post(this.buildUrl('conciliacionBancaria/procesarMovimientoBancario_v2'), payload, {}, progress, handlerEnable)
    }

    private ToDate(value: string): any | Date {
        if (value)
            return formatDate((new Date(value)), 'yyyy-MM-dd', 'en-US');

        return null;
    }

    public importarSustentos(payload:any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      return this.httpClientService.post(this.buildUrl('conciliacionBancaria/movimientoBancario/sustentos/importar'), payload, {}, progress, handlerEnable)
  }
}
