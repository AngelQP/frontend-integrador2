import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment }from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

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

    public createUser (sociedad:string, usuario:string, correo:string, nombre:string, apellidoPaterno:string,
                        apellidoMaterno:string, telefono:string, contrasenia:string, confirmarContrasenia:string): Observable<any>{
        return this.httpClientService
                .post(this.buildUrl('Seguridad/usuario'), {
                    "sociedad": sociedad,
                    "usuario": usuario,
                    "correo": correo,
                    "nombre": nombre,
                    "apellidoPaterno": apellidoPaterno,
                    "apellidoMaterno": apellidoMaterno,
                    "telefono": telefono,
                    "contrasenia": contrasenia,
                    "confirmarContrasenia": confirmarContrasenia
                  }, {})
    }

    public searchUsers(nombre:any,  startAt:any, maxResult:any,
      progress=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      const query = new QueryStringBuilder()
      .add("nombre", nombre)
      .add("startAt", startAt)
      .add("maxResult", maxResult)
      .build();
      const url = this.buildUrl(`Seguridad/usuarios${query}`)
      return this
              .httpClientService
              .get(url, new HttpParams(), progress, handlerEnable)

  }
}
