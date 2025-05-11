import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { authConfig, AuthConfiguration, AuthenticatedInterceptor, AuthenticationService, AuthGuard, AuthInterceptor, AuthorizationOptionsService, AutorizationGuard, TokenProviderService } from '.';

const providers = [
    
    AuthenticationService,
    AuthorizationOptionsService,
    TokenProviderService,
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticatedInterceptor,
      multi: true
    },
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: AuthConfiguration,
      useValue: authConfig
    },
    AuthGuard,
    AutorizationGuard
  ];
  
@NgModule({
    declarations:[],
    imports:[CommonModule, HttpClientModule],
    exports:[HttpClientModule],
    providers:[...providers]
})
export class SecurityModule {

}