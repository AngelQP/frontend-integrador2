import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivationEnd, ActivationStart, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { AuthenticationService, AuthorizationOptionsService } from '@tramarsa/xplat/features';
import { APP_MENU_ITEMS } from '../../../shared/constants/menu.config';

@Component({
  selector: 'tramarsa-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  // encapsulation:  ViewEncapsulation.None
})
export class TopMenuComponent implements OnInit {


  items: MenuItem[] = [];
  // a:any=this.router.events.pipe(
  //   filter(event => ((event instanceof ActivationStart ||event instanceof ActivationEnd) && event.snapshot.component != null)),
  //   mergeMap((activeted:any)=>{
  //     return this.authorizationOptionsService
  //         .getOptionsAsync()
  //         .pipe(
  //           map((r:any)=>{
  //             return {
  //               items: r,
  //               activation:activeted
  //             }
  //           })
  //         )
  //   }),
  //   tap((r:any)=>{

  //     const rcode = r.activation?.snapshot?.data?.authorizationCode
  //     this.items = r.items;
  //     if (rcode){
  //       this.items.forEach((i:any)=>{
  //         if(i.authorizationCode && i.authorizationCode == rcode)
  //           i.styleClass = "option-selected-rb";
  //         else{
  //           if (i.items && i.items.length>0){
  //             let selection = false
  //             i.items?.forEach((element:any) => {
  //               if(element.authorizationCode && element.authorizationCode == rcode){
  //                 selection = true;
  //                 element.styleClass = "option-selected-rb";
  //                 i.styleClass = "option-selected-rb";
  //               }else{
  //                 element.styleClass = "";
  //               }
  //             });
  //             i.styleClass =selection ?i.styleClass:"";
  //           }else{
  //             i.styleClass = "";
  //           }
  //         }
  //       })
  //     }
  //   })
  // ).subscribe();

  constructor(private router: Router,
              private authService: AuthenticationService,
              private authorizationOptionsService: AuthorizationOptionsService) {



  }

  ngOnInit(): void {
    this.items = APP_MENU_ITEMS.filter(item =>
      item.roles.includes(this.authService.getRole())
    );

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.items.forEach(item => {
          item.styleClass = (item.routerLink === url) ? 'option-selected-rb' : '';
        });
      }
    });
  }

}
