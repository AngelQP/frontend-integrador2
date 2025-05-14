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

    // public login (username:string, password:string, clientid:string): Observable<any>{
    //     return this.httpClientService
    //             .post(this.buildUrl('user/login'), {
    //                 "clientId": clientid,
    //                 "userName": username,
    //                 "password": password,
    //                 "rememberMe": true
    //               },{})
    // }

    public login (usuario:string, contrasenia:string, recordarme:boolean): Observable<any>{
        return this.httpClientService
                .post(this.buildUrl('Seguridad/usuario/login'), {
                    "usuario": usuario,
                    "contrasenia": contrasenia,
                    "recordarme": recordarme
                  }, {})
    }

    public forgotPassword (correo:string): Observable<any>{
        return this.httpClientService
                .post(this.buildUrl('Seguridad/forgot-password'), {
                    "correo": correo,
                  }, {})
    }

    public resetPassword (correo:string, otp:string, nuevaContrasenia:string, confirmarContrasenia:string): Observable<any>{
        return this.httpClientService
                .post(this.buildUrl('Seguridad/reset-password'), {
                    "correo": correo,
                    "otp": otp,
                    "nuevaContrasenia": nuevaContrasenia,
                    "confirmarContrasenia": confirmarContrasenia
                  }, {})
    }
}
