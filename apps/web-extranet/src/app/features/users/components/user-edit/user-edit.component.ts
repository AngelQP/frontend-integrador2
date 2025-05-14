import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator, LoadingService } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'tramarsa-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  formNewCliente: FormGroup = this._builder.group({
    razonSocial: [null, [Validators.required]],

    departamento: [null, [Validators.required]],
    provincia: [null, [Validators.required]],
    distrito: [null, [Validators.required]],
    direccion: [null, [Validators.required]]
  })

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  constructor (private router: Router,
              private _builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private loadingService: LoadingService) {
    this.buildValidation();
  }

  buildValidation() {
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    console.log("pantalla editar");
  }

  isValid() {
    return !this.formNewCliente.invalid;
  }

  save() {
    this.showErrors(false);
    if (this.isValid()) {
      // const request = this.buildRequest()
      // this.confirmationService.confirm({
      //   message: '¿Desea continuar?',
      //   header: 'Confirmar',
      //   icon: 'pi pi-info-circle',
      //   accept: () => {

      //     this.clientService.update(request, true, true)
      //       .pipe(map((r: any) => {
      //         handlerRequestResultResolve(
      //           r, //pasamos el requestResult
      //           () => this.showSuccessMessage(), // esto se ejecuta cuando es success
      //           (message: string) => this.errorMessage(message)) // esto se ejecuta cuando no es success

      //       })).subscribe()
      //   }
      // });
    } else {
      this.showErrors(true);
    }
  }

  cancel() {
    this.returnRoute();
  }

  returnRoute() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
  }

  private showErrors(force: boolean = false) {
    if (this.genericValidator) {
      this.displayMessage = this.genericValidator.processMessages(this.formNewCliente, force);
    }
  }
}
