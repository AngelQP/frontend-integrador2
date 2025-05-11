import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';

import { HttpParams } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment }from '../../environments/environment';

@Injectable()
export class PermanenteService extends ApiBaseService {
    constructor( private httpClientService: HttpClientService) 
    { 
        super();
        this.endpoint = environment.endpoint.direccionamiento;
    }
    private ToDate(value:string):any|Date{
        if (value)
        return new Date(value);
    return null;
    }
    public getBy(
        codigoCliente:string,
        codigoDeposito:string,
        codigoEstado:string,
        startAt: number,
        maxResult: number, progress:boolean=false): Observable<any>{
           

            return this.httpClientService
            .get(this.buildUrl(`Permanente/Permanentes?codigoCliente=${codigoCliente}&codigoDeposito=${codigoDeposito}&codigoEstado=${codigoEstado}&startAt=${startAt}&maxResult=${maxResult}`)
             ,new HttpParams(),progress)
            .pipe(map(x=>
                {
                    if(x.permanenteList){
                       x.permanenteList.forEach((element:any)=>{
                        element.vigenciaInicio=this.ToDate(element.vigenciaInicio);
                        element.vigenciaFin=this.ToDate(element.vigenciaFin);
                       });
                    }
                   return x;
                }))
        }
        // public getByUrlDownload(
            
        //     codigoCliente:string,
        //     codigoDeposito:string,
        //     codigoEstado:string,
           
        //    ): string {
    
        //     return this.buildUrl(`Permanente/ExportPermanentes?codigoCliente=${codigoCliente}&codigoDeposito=${codigoDeposito}&codigoEstado=${codigoEstado}`);
        // }

        public getByUrlDownload(
            codigoCliente:string,
            codigoDeposito:string,
            codigoEstado:string,
            progress: boolean = false
           ): Observable<any> {

                const query = new QueryStringBuilder()
                .add("codigoCliente", codigoCliente)
                .add("codigoDeposito", codigoDeposito)
                .add("codigoEstado", codigoEstado)
                .build(true);
    
                return this.httpClientService
                .getBlob(this.buildUrl(`Permanente/ExportPermanentes${query}`), progress)
                .pipe(map( (r: any) => {
                    return {
                        content: this.mapBold(r.body),
                        filename: "Permanente.xlsx"
                    }
                }))
        };

        // public getByUrlHistorialDownload(
        //     idPermanente:string,           
        //    ): string {
    
        //     return this.buildUrl(`Permanente/ExportPermanentesHistorial?idPermanente=${idPermanente}`);
        // }

        public getByUrlHistorialDownload(
            idPermanente:string,
            progress: boolean = false        
           ): Observable<any>{

            const query = new QueryStringBuilder()
            .add("idPermanente", idPermanente)
            .build(true);
    
            return this.httpClientService
            .getBlob(this.buildUrl(`Permanente/ExportPermanentesHistorial${query}`), progress)
            .pipe(map( (r: any) => {
                return {
                    content: this.mapBold(r.body),
                    filename: "PermanenteHistorial.xlsx"
                }
            }))
        }
        

        public getById(idPermanente: any, progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any> {
            return this.httpClientService.get(this.buildUrl(`Permanente/PermanenteGetById?IdPermanente=${idPermanente}`), new HttpParams, progress, handlerEnable);
        }
        public Editar(request:any,progress:boolean=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
            return this.httpClientService.post(this.buildUrl(`Permanente/PermanenteUpdate`), request, {}, progress, handlerEnable)

        }
        public Create(request: any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false): Observable<any> {
            
            return this.httpClientService.post(this.buildUrl(`Permanente/PermanenteCreate`), request, {}, progress, handlerEnable);
    
        }
        public anular(request: any, progress: boolean = false, handlerEnable: boolean|ServerErrorAction=false) {
            return this.httpClientService.post(this.buildUrl(`Permanente/offPermanente`), request, {}, progress, handlerEnable);
        }
}