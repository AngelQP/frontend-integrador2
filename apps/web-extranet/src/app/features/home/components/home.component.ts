import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

import { BaseComponent, MenuService } from '@tramarsa/xplat/core';
import { AuthenticationService, AuthorizationOptionsService } from '@tramarsa/xplat/features';
import { tap } from 'rxjs/operators';

import * as R from 'ramda';
import { Observable } from 'rxjs';
import { APP_MENU_ITEMS } from '../../shared/constants/menu.config';

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
    this.items = APP_MENU_ITEMS.filter(item =>
      item.roles.includes(this.authService.getRole())
    );

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
