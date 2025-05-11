import { Injectable } from '@angular/core';
import { HttpClientService } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment }from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class MenuService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) 
    { 
        super();
        this.endpoint = environment.endpoint.security;
        
    }

    public getMenu (clientid:string,  userid: string): Observable<any>{
        return this.httpClientService
                .get(this.buildUrl(`menu/application/${clientid}/user/${encodeURIComponent(userid)}`))
    }
}