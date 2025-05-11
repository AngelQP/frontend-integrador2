import { Injectable } from '@angular/core';
import { MasterService } from '@tramarsa/xplat/core';
import { AuthenticationService } from '@tramarsa/xplat/features';
import { Observable, of, pipe } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FilteringMasterService {
    
    sucursalesTramarsa?:any[];
    sucursales:any={}
    constructor(private masterService: MasterService,
                private authenticationService: AuthenticationService) { }
    
    
    public getSucursalesTramarsa(): Observable<any>{
        if (this.sucursalesTramarsa){
            return of(this.sucursalesTramarsa);
        }
        return this.masterService
        .getSucursalesTramarsa()
        .pipe(map(res=>{
            this.sucursalesTramarsa=res;
            return res;
        }));
    }

    public getSucursales(codigoSociedad: string): Observable<any>{
        if (this.sucursales[codigoSociedad]){
            return of(this.sucursales[codigoSociedad]);
        }
        return this.masterService
        .getSucursalesKeyValue(codigoSociedad)
        .pipe(map(res=>{
            this.sucursales[codigoSociedad]=res;
            return res;
        }));
    }
    
}