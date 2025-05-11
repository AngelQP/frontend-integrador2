import { Injectable } from '@angular/core';
import { HttpClientService } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment }from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class UserService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService) 
    { 
        super();
        this.endpoint = environment.endpoint.security;
        
    }

    public login (username:string, password:string, clientid:string): Observable<any>{
        return this.httpClientService
                .post(this.buildUrl('user/login'), { 
                    "clientId": clientid, 
                    "userName": username, 
                    "password": password, 
                    "rememberMe": true 
                  },{})
    }
}