import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, UrlSegment, UrlTree, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '.';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    constructor(protected authenticationService: AuthenticationService)
    {

    }
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.verifyAccess(route.data?.roles);
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.verifyAccess(route.data?.roles);
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

    private verifyAccess(allowedRoles?: string[]): boolean | UrlTree {
      if (!this.authenticationService.isAuthenticate()) {
        this.authenticationService.login(window.location.pathname);
        return false;
      }

      if (allowedRoles && allowedRoles.length > 0) {
        const userRole = this.authenticationService.getRole();

        if (!allowedRoles.includes(userRole)) {
          window.location.href = '/unauthorized';
          return false;
        }
      }

      return true;
    }
}
