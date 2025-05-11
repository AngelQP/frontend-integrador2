import { Injectable } from '@angular/core';
import { HttpClientService } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class BulkDesgloseService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.desglose;
    }

    upload(codigoCliente: string,file: any): Observable<any> {
        const formData = new FormData();
        formData.append("csvDesglose", file);
        return this.httpClientService.post(this.buildUrl(`BulkDesglose/${codigoCliente}`), formData);

    }

    processId(id: any): Observable<any> {
        return this.httpClientService.patch(this.buildUrl(`BulkDesglose/process/${id}`));
    }

    bulkDesglose(id: any): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`BulkDesglose/${id}?withOk=false&withErrores=true`));
    }

    delete(id: any): Observable<any>{
        return this.httpClientService.delete(this.buildUrl(`BulkDesglose/${id}`));
    }
}