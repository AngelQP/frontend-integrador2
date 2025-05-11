
import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClientService, ServerErrorAction } from '@tramarsa/xplat/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable()
export class SobreestadiaService {
    urlsobreestadiacalc: string
    urlsobreestadiaoperaciones: string
    constructor(private httpClientService: HttpClientService) 
    {
        this.urlsobreestadiacalc = environment.endpoint.sobreestadiacalc;
        this.urlsobreestadiaoperaciones = environment.endpoint.sobreestadiaoperaciones;

    }

    private ToDate(value: string): any | Date {
        if (value)
            return formatDate((new Date(value)), 'yyyy-MM-dd', 'en-US');

        return null;
    }
    
    public calc(request: any, proggres: boolean = false): Observable<any>{
       return  this.httpClientService.post(`${this.urlsobreestadiacalc}Pagos/Sobrestadia/Calcular`, request, {}, proggres)
       .pipe(map(x => {
           if(x.data){
               
               console.log(x);
               x.data.detalleSobrestadia.forEach((element: any) => {
                       element.inicio = this.ToDate(element.inicio);
                       element.fin = this.ToDate(element.fin);
                });
                x.data.dataOperativa;
                x.data.importesCalculo;
                x.data.importesTotales;
            //    json.forEach((element: any) => {
            //        element.dataOperativa.fechaCalculo = this.ToDate(element.dataOperativa.fechaCalculo);
            //    });
           }
           return x.data;
       }));
    }

    public search(request: any, proggres: boolean = false): Observable<any>{
        return  this.httpClientService.post(`${this.urlsobreestadiaoperaciones}Operaciones/BlContenedor/Consultar`, request, {}, proggres)
        .pipe(map(x => {
            if(x.data){
                x.data.forEach((element: any) => {
                    element.fechaAtraque = this.ToDate(element.fechaAtraque);
                    element.fechaDevolucion = this.ToDate(element.fechaDevolucion);
                    element.fechaVistoBueno = this.ToDate(element.fechaVistoBueno);
                });
            }
            return x;
        }));
    }

    public comprarSob(request: any, proggres: boolean = false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
        return  this.httpClientService.post(`${this.urlsobreestadiacalc}Pagos/CompraDias/Generar`, request, {}, proggres, handlerEnable);
     }
}