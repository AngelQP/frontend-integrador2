import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator, LoadingService, UserService } from "@tramarsa/xplat/core";
import { StorageService } from "@tramarsa/xplat/utils";
import { catchError, finalize, map } from "rxjs/operators";

@Component({
  selector: 'tramarsa-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ForgotPassworComponent implements OnInit, OnDestroy {
  private genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};
  messageServer?:string;

  storage: StorageService  = new StorageService();

  forgotPasswordForm: FormGroup = this._builder.group({
    email:['', Validators.required]
  });

  constructor(@Inject(DOCUMENT) private _document: any,
              private _builder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private loadingService: LoadingService,) {
    this.buildValidation();
  }

  buildValidation(){
    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  private showErrors(force: boolean = false) {
    if (this.genericValidator){
      this.displayMessage = this.genericValidator.processMessages(this.forgotPasswordForm, force);
    }
  }

  ngOnInit(): void {
    this._document.body.classList.add('body-login');
  }

  ngOnDestroy(): void {
    this._document.body.classList.add('body-login');
  }

  send(value:any): void {
    if (!this.forgotPasswordForm.invalid) {
      this.showErrors(false);
      this.messageServer="";
      this.loadingService.show();

      this.userService.forgotPassword(value.email)
        .pipe(
          finalize(() => this.loadingService.hide()),
          catchError(err => {
            this.messageServer = "Ha ocurrido un error, intentelo mas tarde.";
            return err;
          }),
          map(res => {
            if (res.isSuccess) {
              // this.storage.setItem('correoRecuperacion', value.email);
              sessionStorage.setItem('correoRecuperacion', value.email);
              this.router.navigate(['/forgot-password/reset-password']);
            } else if (res.brokenRules && res.brokenRules.length > 0) {
              this.messageServer =res.brokenRules[0].description;
            } else {
              this.messageServer = "Ha ocurrido un error al enviar el correo electronico."
            }
            return res;
          })
        )
        .subscribe();
    } else {
      this.showErrors(true);
    }
  }

  changePageLogin() {
    this.router.navigate(['/login']);
  }
}
