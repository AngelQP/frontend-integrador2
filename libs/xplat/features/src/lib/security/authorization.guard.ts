import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { MenuService } from "@tramarsa/xplat/core";
import { Observable } from "rxjs";
import { map, shareReplay, tap } from "rxjs/operators";
import { AuthConfiguration, AuthenticationService, AuthGuard, AuthorizationOptionsService } from ".";
import * as R from 'ramda';
import { Injectable } from "@angular/core";

@Injectable()
export class AutorizationGuard extends AuthGuard {
    
    constructor(authenticationService: AuthenticationService, 
                private router: Router,
                private authorizationOptionsService: AuthorizationOptionsService) 
    {
        super(authenticationService);
    }
    

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree>{
        if (this.verifyLogged()){
            let authoToCheck = route.data.authorizationCode;
            if (authoToCheck === undefined) {
                if (typeof (route.data) === 'object') {
                    authoToCheck = route.data[0]?.authorizationCode;
                }
            }
            
            if (authoToCheck !== null && authoToCheck !== undefined) {
                return this.authorizationOptionsService.$autorizations
                       .pipe(
                        map((r:any)=>{
                            if(r.isValid){
                                //solo 3 niveles del menu agregar segun sea el caso
                                // la funcion appende se debe probar para siguiente release
                                //const append = (n:any, c:number=1) => (c < 3 && n.children.length>0 ? [...append(n.children, c+1)] : [...n.children]);
                                const items = R.chain((n:any)=>[...R.chain((n1:any)=>[n1,...n1.children], n.children)], r.data);
                                return !!items.find((m:any)=>this.compare(m.code, authoToCheck))
                            }
                            return false;
                        }),
                        tap((r:any)=>{
                           if(!r){
                            this.router.navigate(['unauthorized']);
                           }
                       }))
            }
            return true;
        }
        else{
            return false;
        }
    }

    private compare(code: any, authoToCheck: any):boolean{
        if (Array.isArray(authoToCheck))
            return !!R.find((auth:any)=> auth==code );
        return authoToCheck==code;
    }

}