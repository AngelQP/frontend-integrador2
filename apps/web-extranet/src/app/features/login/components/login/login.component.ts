
import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericValidator, LoadingService } from '@tramarsa/xplat/core';
import { AuthenticationService } from '@tramarsa/xplat/features';
import { catchError, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'tramarsa-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {

  private genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};
  messageServer?:string;

  loginForm: FormGroup = this._builder.group({
    txtUsername:['', Validators.required],
    txtPassword:['', Validators.required]
  });

  showPassword = false;

  constructor(@Inject(DOCUMENT) private _document: any,
              private _builder: FormBuilder,
              private authService: AuthenticationService,
              private loadingService: LoadingService,
              private router: Router) {

    this.buildValidation();

  }

  buildValidation(){
    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  private showErrors(force: boolean = false) {
    if (this.genericValidator){
      this.displayMessage = this.genericValidator.processMessages(this.loginForm, force);
    }

  }

  ngOnInit(): void {
    this._document.body.classList.add('body-login');
  }

  ngOnDestroy(): void {
    this._document.body.classList.add('body-login');
  }

  send(value:any):void{
    if (!this.loginForm.invalid){

      this.showErrors(false);
      this.messageServer="";
      this.router.navigate(['/home']);
      // this.loadingService.show();
      // this.authService
      // .doLogin(value.txtUsername, value.txtPassword)
      // .pipe(
      //   finalize(()=> this.loadingService.hide()),
      //   catchError(err=> {
      //     this.messageServer = "Ha ocurrido un error, intentelo mas tarde."
      //     return err;
      //   }),
      //   map(res=>
      //     {

      //       if(res.isValid){
      //         this.router.navigate(['/']);
      //       }
      //       else if(res.messages && res.messages.length>0){
      //         this.messageServer =res.messages[0].message;
      //       }
      //       else{
      //         this.messageServer = "Ha ocurrido un error al iniciar sesión."
      //       }
      //       return res;
      //     })
      // )
      // .subscribe();
    }
    else{
      this.showErrors(true);
    }

  }

  changePageForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
