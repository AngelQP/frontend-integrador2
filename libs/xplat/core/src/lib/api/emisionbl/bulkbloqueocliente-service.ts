import { Injectable } from '@angular/core';
import { HttpClientService } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class BulkBloqueoClienteService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) {
        super();
        this.endpoint = environment.endpoint.emisionbl;
    }

    upload(file: any): Observable<any> {
        const formData = new FormData();
        formData.append("csvBloqueoClient", file);
        return this.httpClientService.post(this.buildUrl(`BulkEntregaBL/bloqueoclient`), formData);

    }

    processId(id: any): Observable<any> {
        return this.httpClientService.patch(this.buildUrl(`BulkEntregaBL/bloqueoclient/process/${id}`));
    }

    bulkBloqueoClient(id: any): Observable<any> {
        return this.httpClientService.get(this.buildUrl(`BulkEntregaBL/bloqueoclient/${id}?withOk=false&withErrores=true`));
    }

    delete(id: any): Observable<any>{
        return this.httpClientService.delete(this.buildUrl(`BulkEntregaBL/bloqueoclient/${id}`));
    }
}