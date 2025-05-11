import { Injectable } from '@angular/core';
import { HttpClientService } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment }from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable()
export class ArchivoDesgloseService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) 
    { 
        super();
        this.endpoint = environment.endpoint.desglose;
    }

   

    public create(request: any, progress?:boolean):Observable<any>{
        return this.httpClientService.post(this.buildUrl(`archivo`), request, {}, progress);
    }

}