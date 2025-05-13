import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

import { BaseComponent, MenuService } from '@tramarsa/xplat/core';
import { AuthenticationService, AuthorizationOptionsService } from '@tramarsa/xplat/features';
import { tap } from 'rxjs/operators';

import * as R from 'ramda';
import { Observable } from 'rxjs';

@Component({
  selector: 'tramarsa-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent extends BaseComponent implements OnInit {

  name?: string
  items: MenuItem[];



  constructor(private authService: AuthenticationService,
              private authorizationOptionsService: AuthorizationOptionsService){
    super();
    this.name = authService.firstName() ?  authService.firstName(): authService.userId();
    this.items = [];

  }
  ngOnInit(): void {
    console.log("home");
    this.items = [
      {
        label: 'Productos',
        icon: 'pi pi-desktop',
        routerLink: '/productos'
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        routerLink: '/clientes'
      },
      {
        label: 'Proveedores',
        icon: 'pi pi-briefcase',
        routerLink: '/proveedores'
      }
    ]
    // this.authorizationOptionsService
    //             .getOptionsAsync()
    //             .pipe(tap((r:any)=>{
    //               this.items = r;
    //             })).subscribe();
  }
  logout(){

    this.authService.doLogout();
  }
}
