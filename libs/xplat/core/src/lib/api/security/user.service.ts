import { Injectable } from '@angular/core';
import { HttpClientService, QueryStringBuilder, ServerErrorAction } from '../..';
import { ApiBaseService } from '../api.base.service';
import { environment }from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService extends ApiBaseService {
    constructor(private httpClientService: HttpClientService)
    {
        super();
        this.endpoint = environment.endpoint.security;

    }

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

    public createUser(request: any, progress=false, handlerEnable: boolean|ServerErrorAction=false){
        return this.httpClientService.post(this.buildUrl("Seguridad/usuarios"), request, {}, progress, handlerEnable)
    }

    public searchUsers(nombre:any, rol:any, estado:any, startAt:any, maxResult:any,
      progress=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      const query = new QueryStringBuilder()
      .add("nombre", nombre)
      .add("rol", rol)
      .add("estado", estado, true)
      .add("startAt", startAt)
      .add("maxResult", maxResult)
      .build();
      const url = this.buildUrl(`Seguridad/usuarios${query}`)
      return this
              .httpClientService
              .get(url, new HttpParams(), progress, handlerEnable)

    }

    public downloadSearch(nombre:any, rol:any, estado:any, progress=false){
        const query = new QueryStringBuilder()
        .add("nombre", nombre)
        .add("rol", rol)
        .add("estado", estado, true)
        .build();

        return this.httpClientService.getBlob(this.buildUrl(`Seguridad/usuarios/exportar`+query), progress)
        .pipe(map( (r: any) => {
            return {
                content: this.mapBold(r.body),
                filename: "Usuarios.xlsx"
            }
        }))
    }

    public userGetById(idUsuario:any, progress=false, handlerEnable: boolean|ServerErrorAction=false):Observable<any>{
      const url = this.buildUrl(`Seguridad/usuarios/${idUsuario}`)
      return this
              .httpClientService
              .get(url, new HttpParams(), progress, handlerEnable)
    }

    public userChangeState(idUsuario:any, estado:any, progress=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
        return this.httpClientService
                .put(this.buildUrl(`Seguridad/usuarios/${idUsuario}/estado`), {
                    "estado": estado,
                  }, progress, handlerEnable)
    }
}
