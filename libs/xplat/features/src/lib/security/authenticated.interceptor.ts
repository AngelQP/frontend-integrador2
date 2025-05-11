
import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor, 
  HttpRequest, 
  HttpHandler, 
  HttpSentEvent,
  HttpHeaderResponse, 
  HttpProgressEvent, 
  HttpResponse, 
  HttpUserEvent, 
  HttpErrorResponse
} from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '.';
import { Observable, throwError  } from 'rxjs';

@Injectable()
export class AuthenticatedInterceptor implements HttpInterceptor {

  private authService?: AuthenticationService;

  constructor(private inj: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler)
    : Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {

    if (this.authService == null) {
      this.authService = this.inj.get(AuthenticationService);
    }
    
    return next.handle(req).pipe(catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401 && this.authService) {
            this.authService.login(window.location.pathname);
          }
        }
        return throwError(err);
      }));
  }
}
