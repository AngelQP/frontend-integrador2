import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService, QueryStringBuilder } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import * as R from 'ramda';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class MasterService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.maestro;
    }

    public getSucursales(codigoSociedad: string): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`master/Sucursales?codigoSociedad=${codigoSociedad}`));
    }

    public getSucursalesKeyValue(codigoSociedad: string): Observable<any> {
        return this.getSucursales(codigoSociedad)
            .pipe(map(r => R.project(["codigoSucursal", "nombre"], r)))
    }

    public getSucursalesTramarsa(): Observable<any> {
        return this.getSucursalesKeyValue('301');
    }

    public getCatalogo(codigoAplicacion: string,
        codigoCatalogo: string,
        codigoSociedad: string,
        codigoPais: string): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`master/Catalogos?codigoAplicacion=${codigoAplicacion}&codigoCatalogo=${codigoCatalogo}&codigoSociedad=${codigoSociedad}&codigoPais=${codigoPais}`));
    }

    public getRoles(): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`Master/Roles`));
    }


    public getLineas(): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`master/Lineas?codigoSociedad=301&codigoPais=PE`));
    }

    public getDepositos(codigoSucursal: string): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`master/Depositos?codigoSucursal=${codigoSucursal}`));
    }

    public getDepositosKeyValue(codigoSucursal: string): Observable<any> {
        return this.getDepositos(codigoSucursal)
            .pipe(map(r => R.project(["codigoDeposito", "nombre"], r)))
    }

    public getSociedades(pregress?: boolean): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`master/Sociedades`), new HttpParams, pregress);
    }
    public getBancos(codigoSociedad: string, progress: boolean = false): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`master/CuentaCorriente?codigoSociedad=${codigoSociedad}`), new HttpParams(), progress);
    }

    public getCuentasCorrientes(codigoSociedad: string, codigoBanco: string): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`master/CuentaCorrienteGetByBanco?codigoSociedad=${codigoSociedad}&codigoBanco=${codigoBanco}`));
    }

    public getPuertos(namelike:any): Observable<any>{
        return this.httpClientService.get(this.buildUrl(`master/Puertos?nombre=${namelike}`));
    }

    public getUbigeo(codigoUbigeo: any="", detalles: boolean= true): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`master/ubigeo?codigoUbigeo=${codigoUbigeo}&detalles=${detalles}`));
    }

    public getPaises(): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`master/paises`));
    }

    public getSucursalesHLL(): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`master/SucursalesHLL`));
    }

    public getNegocios(codigoSociedad:any): Observable<any> {
      return this.httpClientService.get(this.buildUrl(`master/Negocios?codigoSociedad=${codigoSociedad}`));
  }
}