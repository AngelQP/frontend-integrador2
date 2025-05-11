import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator } from "@tramarsa/xplat/core";

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

  forgotPasswordForm: FormGroup = this._builder.group({
    email:['', Validators.required]
  });

  constructor(@Inject(DOCUMENT) private _document: any,
              private _builder: FormBuilder,
              private router: Router) {
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
      this.router.navigate(['/forgot-password/reset-password']);
    } else {
      this.showErrors(true);
      this.router.navigate(['/forgot-password/reset-password']);
    }
  }

  changePageLogin() {
    this.router.navigate(['/login']);
  }
}
