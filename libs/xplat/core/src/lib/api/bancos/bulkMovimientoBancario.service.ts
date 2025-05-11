import { Injectable } from '@angular/core';
import { HttpClientService } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class BulkMovimientoBancarioService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.bancos;
    }

    upload(codigoSociedad: string, codigoBanco:string, codigoMoneda:string, numeroCuenta:string, file: any): Observable<any> {
        const formData = new FormData();
        formData.append("csvDesglose", file);
        return this.httpClientService.post(this.buildUrl(`BulkMovimientoBancario/${codigoSociedad}/${codigoBanco}/${codigoMoneda}/${numeroCuenta}`), formData);

    }

    processId(id: any): Observable<any> {
        return this.httpClientService.patch(this.buildUrl(`BulkMovimientoBancario/process/${id}`));
    }

    bulkMovimientoBancario(id: any): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`BulkMovimientoBancario/${id}?withOk=false&withErrores=true`));
    }


    delete(id: any): Observable<any>{
        return this.httpClientService.delete(this.buildUrl(`BulkMovimientoBancario/${id}`));
    }
}