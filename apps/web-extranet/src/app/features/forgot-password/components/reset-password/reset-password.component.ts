import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator, LoadingService, UserService } from "@tramarsa/xplat/core";
import { MessageService } from "primeng/api";
import { catchError, finalize, map } from "rxjs/operators";

@Component({
  selector: 'tramarsa-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  private genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};
  messageServer?:string;

  showNewPass = false;
  showConfirmPass = false;

  correoSeleccionado:any;

  resendDisabled = false;
  resendCountdown = 0;
  intervalId: any;

  mostrarDialogoExito = false;
  mensajeExito = '';

  constructor(@Inject(DOCUMENT) private _document: any,
                private _builder: FormBuilder,
                private router: Router,
                private userService: UserService,
                private loadingService: LoadingService,
                private messageService: MessageService,) {
    this.buildValidation();
  }

  resetPasswordForm: FormGroup = this._builder.group({
    code:['', Validators.required],
    newPassword:['', Validators.required],
    confirmPassword:['', Validators.required],
  });

  buildValidation(){
    this.genericValidator = new GenericValidator(this.validationMessages);
  }
  private showErrors(force: boolean = false) {
    if (this.genericValidator){
      this.displayMessage = this.genericValidator.processMessages(this.resetPasswordForm, force);
    }
  }

  ngOnInit(): void {
    const correo = sessionStorage.getItem('correoRecuperacion');

    if (!correo) {
      this.router.navigate(['/forgot-password']);
      return;
    }

    const maskedCorreo = this.maskCorreo(correo);
    this.correoSeleccionado = maskedCorreo;

    this._document.body.classList.add('body-login');
  }

  ngOnDestroy(): void {
    this._document.body.classList.add('body-login');
    sessionStorage.removeItem('correoRecuperacion');
  }

  maskCorreo(correo: string): string {
    const [localPart, domain] = correo.split('@');
    const maskedLocalPart = localPart.slice(0, Math.floor(localPart.length / 2)) + '*'.repeat(localPart.length - Math.floor(localPart.length / 2)); // Enmascara la mitad del localPart
    return maskedLocalPart + '@' + domain;
  }

  submitReset(value:any) {
    if (!this.resetPasswordForm.invalid) {
      this.showErrors(false);
      this.messageServer="";
      this.loadingService.show();

      const correo = sessionStorage.getItem('correoRecuperacion');
      if (correo) {
        this.userService.resetPassword(correo, value.code, value.newPassword, value.confirmPassword)
          .pipe(
            finalize(() => this.loadingService.hide()),
            catchError(err => {
              this.messageServer = "Ha ocurrido un error, intentelo mas tarde.";
              return err;
            }),
            map(res => {
              if (res.isSuccess) {
                this.mensajeExito = 'La contraseña se restableció correctamente.';
                this.mostrarDialogoExito = true;
                // this.router.navigate(['/login']);
              } else if (res.brokenRules && res.brokenRules.length > 0) {
                this.messageServer =res.brokenRules[0].description;
              } else {
                this.messageServer = "Ha ocurrido un error al enviar el correo electronico."
              }
              return res;
            })
          )
          .subscribe();
      }

    } else {
      this.showErrors(true);
    }
  }

  resendCode() {
    if (this.resendDisabled) return;

    const correo = sessionStorage.getItem('correoRecuperacion');
    if (correo) {
      this.showErrors(false);
      this.messageServer="";
      this.loadingService.show();

      this.userService.forgotPassword(correo)
        .pipe(
          finalize(() => this.loadingService.hide()),
          catchError(err => {
            this.messageServer = "Ha ocurrido un error, intentelo mas tarde.";
            return err;
          }),
          map(res => {
            if (res.isSuccess) {
              this.startResendCooldown();
            } else if (res.brokenRules && res.brokenRules.length > 0) {
              this.messageServer =res.brokenRules[0].description;
            } else {
              this.messageServer = "Ha ocurrido un error al enviar el correo electronico."
            }
            return res;
          })
        )
        .subscribe();
    }
    console.log("codigo reenviado");
  }

  redirigirLogin() {
    this.mostrarDialogoExito = false;
    this.router.navigate(['/login']);
  }

  startResendCooldown() {
    this.resendDisabled = true;
    this.resendCountdown = 30;

    this.intervalId = setInterval(() => {
      this.resendCountdown--;

      if (this.resendCountdown <= 0) {
        clearInterval(this.intervalId);
        this.resendDisabled = false;
      }
    }, 1000);
  }

  onlyNumbers(event: KeyboardEvent) {
    const charCode = event.charCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
