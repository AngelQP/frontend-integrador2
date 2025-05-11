import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator } from "@tramarsa/xplat/core";

@Component({
  selector: 'tramarsa-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RecoveryPasswordComponent implements OnInit, OnDestroy {
  private genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};
  messageServer?:string;

  showNewPass = false;
  showConfirmPass = false;

  constructor(@Inject(DOCUMENT) private _document: any,
                private _builder: FormBuilder,
                private router: Router) {
    this.buildValidation();
  }

  forgotPasswordForm: FormGroup = this._builder.group({
    code:['', Validators.required],
    newPassword:['', Validators.required],
    confirmPassword:['', Validators.required],
  });

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

  submitReset(value:any) {
    console.log("codigo enviado");
  }

  sendCode() {
    // this.router.navigate(['/login']);
    console.log("codigo enviado");
  }

  resendCode() {
    console.log("codigo reenviado");
  }
}
