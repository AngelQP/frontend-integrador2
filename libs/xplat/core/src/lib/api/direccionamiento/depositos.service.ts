import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClientService, QueryStringBuilder } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment }from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DepositosService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) 
    { 
        super();
        this.endpoint = environment.endpoint.direccionamiento;
    }

    // public getByUrlDonwload(codigoSucursal: string,
    //     codigoDeposito: string
    //     ): string{
        
    //     return this.buildUrl(`direccionamiento/ExportDepositos?codigoSucursal=${codigoSucursal}&codigoDeposito=${codigoDeposito}`)
    // }

    public getByUrlDonwload(
        codigoSucursal: string,
        codigoDeposito: string,
        progress: boolean = false 
        ): Observable<any> {

            const query = new QueryStringBuilder()
            .add("codigoSucursal", codigoSucursal)
            .add("codigoDeposito", codigoDeposito)
            .build(true);
        
        return this.httpClientService
        .getBlob(this.buildUrl(`Direccionamiento/ExportDepositos${query}`), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "Deposito.xlsx"
            }
        }))
    }

    public getBy(codigoSucursal: string,
        codigoDeposito: string, 
        startAt: number,
        maxResult: number, progress:boolean=false) : Observable<any>{
        
        return this.httpClientService
        .get(this.buildUrl(`Direccionamiento/DepositoGet?codigoSucursal=${codigoSucursal}&codigoDeposito=${codigoDeposito}&startAt=${startAt}&maxResult=${maxResult}`)
        ,new HttpParams(),progress)
                   .pipe(map(x=> 
                    {
                        if(x.depositoList){
                            x.depositoList
                        }
                        return x;
                    }));
    }

    public getDepositosActivos(codigoSucursal: string): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`Direccionamiento/DepositosActivos?codigoSucursal=${codigoSucursal}`));
    }

    public on(codigoDeposito: any)
    {
        return this.httpClientService.patch(this.buildUrl(`Direccionamiento/depositoOn/${codigoDeposito}`));
    }

    public off(codigoDeposito: any)
    {
        return this.httpClientService.patch(this.buildUrl(`Direccionamiento/depositoOff/${codigoDeposito}`));
    }
}
