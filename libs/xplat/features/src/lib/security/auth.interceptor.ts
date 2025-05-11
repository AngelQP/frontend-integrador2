import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { AuthenticationService } from ".";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private authService?: AuthenticationService;

  constructor(private inj: Injector) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (this.authService== null)
      this.authService = this.inj.get(AuthenticationService);
    
      if (this.authService.isAuthenticate()) {
      req = req.clone({
        setHeaders: {
          Authorization: this.authService.authorizationHeaderValue
        }
      });
    }

    return next.handle(req);

  }
}