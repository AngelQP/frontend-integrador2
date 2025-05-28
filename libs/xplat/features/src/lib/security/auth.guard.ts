import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, UrlSegment, UrlTree, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '.';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    constructor(protected authenticationService: AuthenticationService )
    {

    }
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.verifyLogged();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.verifyLogged();
    }

    verifyLogged() : boolean{

        if(this.authenticationService.isAuthenticate()){
            return true;
        }
        else{
            this.authenticationService.login(window.location.pathname);
            return false;
        }
    }
}
