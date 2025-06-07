import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@tramarsa/xplat/features';
import { APP_ROLES_ITEMS } from '../../../shared/constants/menu.config';

@Component({
  selector: 'tramarsa-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  fullname?:string
  roleName?:string
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.fullname = this.authService.fullName();
    this.roleName = this.getRoleName()
  }

  getRoleName(){
    const role = this.authService.getRole();
    // const role = roles && roles.length>0?roles[0]:""

    if (role) {
      const part = role.split(".")
      const value = part.length === 2 ? part[1] : part[0];
      const roleItem = APP_ROLES_ITEMS.find(item => item.value === value);
      return roleItem ? roleItem.label : value;
      // if (part.length>0){
      //   return part.length == 2?part[1]:part[0]
      // }
    }
    return "";
  }

  logout(){
    this.authService.doLogout();
  }
}
