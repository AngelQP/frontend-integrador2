import { Injectable } from '@angular/core';
import { UserService } from '@tramarsa/xplat/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, refCount } from 'rxjs/operators';
import { AuthConfiguration } from './auth.config';
import { TokenProviderService } from './tokenprovider.service';

@Injectable()
export class AuthenticationService {

    ROLECODECLIENT: string = "client"
    ROLECODEADMIN: string = "Admin"

    constructor(private userService: UserService,
                private tokenProvider: TokenProviderService,
                private authConfig: AuthConfiguration)
    {

    }
    public firstName():string{
        const data = this.tokenProvider.getData();
        if (data)
            return `${data.nombre}`
        return "";
    }
    public lastName():string{
        const data = this.tokenProvider.getData();
        if (data)
            return `${data.apellidoPaterno??""} ${data.apellidoMaterno??""}`;
        return "";
    }
    public fullName(): string{
        const data = this.tokenProvider.getData();
        if (data)
            return `${data.nombre??""} ${data.apellidoPaterno??""} ${data.apellidoMaterno??""}`
        return "";
    }
    public userId(): string{
        const data = this.tokenProvider.getData();
        if (data)
            return data.userName;
        return "";
    }

    public email(): any {
        const data = this.tokenProvider.getData();
        if (data)
            return data.email;
        return "";
    }

    public isClient(): boolean{
       return this.inRole(this.ROLECODECLIENT) && !!this.client;
    }
    public isAgenteAduanaClient(): boolean{
         if (this.isClient()) {
             const _client = this.client
             if (_client?.rolList && _client.rolList.length>0){
                return !!_client.rolList.find((r:any)=>r==8)
             }
         }
         return false;
     }
    public isAdmin(): boolean{
        return this.inRole(this.ROLECODEADMIN);
     }
    public inRole(role:string):boolean{
        const roles = this.getRoles();
        const roleApp = `${this.authConfig.clientId}.${role}`
        return roles.filter(x=>x.toLocaleLowerCase().trim() === roleApp.toLocaleLowerCase().trim()).length > 0;
    }
    public getRoles():string[]{
        const data = this.tokenProvider.getData()
        if (data.application && data.application.roles){
            return data.application.roles;
        }
        return [];
    }
    public isAuthenticate() :boolean {
        if(this.tokenProvider.isToken())
        {

            const expiresAt = this.tokenProvider.getExpiresIn();
            const authDate = this.tokenProvider.getDate();
            if (authDate)
            {
                const now = new Date();
                const timeElapsed = (now.getTime() - authDate.getTime())/1000;
                console.log("Time elapsed: " + timeElapsed);
                //return !!(expiresAt &&
                //   parseInt(expiresAt, 10) < now.getTime() -600_000)

                return !!(expiresAt &&
                   parseInt(expiresAt, 10) > timeElapsed)
            }


        }
        return false;
    }
    get authorizationHeaderValue() {
        return "bearer "+ this.tokenProvider.getToken();
    }
    public doLogin(username:string, password: string, recordarme: boolean):Observable<any>{
        return this.userService
                   .login(username, password, recordarme)
                   .pipe(mergeMap((loginRequest:any)=>{
                        this.success(loginRequest);
                        if (loginRequest.isSuccess) {


                            // if (this.inRole(this.ROLECODECLIENT)){
                            //     const data = this.tokenProvider.getData();


                            //     return data;
                            // }
                        }
                        // else {
                        //   this.clear();
                        //   loginRequest.isSuccess = false;
                        //   loginRequest.messages=[{message:"No s"}]
                        // }
                        return of(loginRequest);
                   }))
                   //.pipe(map(res=> this.success(res) ));
    }

    private success(response:any){
        if(response.isSuccess){
            this.clear();
            this.tokenProvider.setExpiresIn(response.data?.token?.expiresIn);
            this.tokenProvider.setToken(response.data?.token?.accessToken);
            this.tokenProvider.setData(response.data?.usuario);
            this.tokenProvider.setDate();

        }
        return response;
    }
    public setClient(client:any){
        this.tokenProvider.setClient(client);
    }
    public get client(){
        return this.tokenProvider.getClient();
    }
    public doLogout():Observable<any>{
        return of(this.logout())
    }

    public login(path: string=''){
        let url = `${this.authConfig.issuer}`

        if (path) url += `?returnUrl=${encodeURIComponent(path)}`;

        if (this.authConfig.openUri)this.authConfig.openUri(url);
    }
    public logout(){
        this.clear();
        this.login();
    }
    private clear(){
        this.tokenProvider.clearToken();
        this.tokenProvider.clearData();
        this.tokenProvider.clearExpiresIn();
        this.tokenProvider.clearClient();
        this.tokenProvider.setDate();
    }

}
