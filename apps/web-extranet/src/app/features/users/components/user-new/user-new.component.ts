import { Component, OnInit } from "@angular/core";
import { EmailValidator, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator, handlerRequestResultResolve, UserService } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { map } from "rxjs/operators";
import { SearchUsersComponent } from "../search-users/search-users.component";
import { AuthenticationService } from "@tramarsa/xplat/features";

@Component({
  selector: 'tramarsa-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  formNewUser: FormGroup = this._builder.group({
    // usuario: [null, [Validators.required]],
    correo: [null, [Validators.required]],
    nombre: [null, [Validators.required]],
    apellidoPaterno: [null, [Validators.required]],
    apellidoMaterno: [null, [Validators.required]],
    telefono: [null, [Validators.required]],
    contrasenia: [null, [Validators.required]],
    confirmarContrasenia: [null, [Validators.required]],
    rol: [null, [Validators.required]],
  })

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  allRoles = [
    { label: 'Administrador General', value: 'ADMIN_GENERAL' },
    { label: 'Administrador Tienda', value: 'ADMIN_TIENDA' },
    { label: 'Cajero', value: 'CAJERO' }
  ];

  roles: { label: string; value: string }[] = [];

  constructor(private router: Router,
              private _builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private userService: UserService,
              private messageService: MessageService,
              private mainComponent: SearchUsersComponent,
              private authService: AuthenticationService,) {
    this.buildValidation();
  }

  ngOnInit(): void {
    if (this.authService.isAdminGeneral()) {
      this.roles = this.allRoles;
    } else if (this.authService.isAdminTienda()) {
      this.roles = this.allRoles.filter(r => r.value === 'CAJERO');
    }
  }

  buildValidation() {
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  isValid() {
    return !this.formNewUser.invalid;
  }

  save() {
    this.showErrors(false);
    if (this.isValid()) {
      this.confirmationService.confirm({
        message: '¿Desea continuar?',
        header: 'Confirmar',
        icon: 'pi pi-info-circle',
        accept: () => {
          const request = this.buildRequest()
          this.userService.createUser(request, true, true)
            .pipe(map((r: any) => {
              handlerRequestResultResolve(
                r, //pasamos el requestResult
                () => this.showSuccessMessage(), // esto se ejecuta cuando es success
                (message: string) => this.errorMessage(message)) // esto se ejecuta cuando no es success

            })).subscribe()
        }
      });
    } else {
      this.showErrors(true);
    }
  }

  buildRequest() {
    const valueFrm = this.formNewUser.value
    return {
      sociedad: "S1",
      usuario: valueFrm.usuario,
      correo: valueFrm.correo.trim(),
      nombre: valueFrm.nombre.trim(),
      apellidoPaterno: valueFrm.apellidoPaterno.trim(),
      apellidoMaterno: valueFrm.apellidoMaterno.trim(),
      telefono: valueFrm.telefono.trim(),
      contrasenia: valueFrm.contrasenia.trim(),
      confirmarContrasenia: valueFrm.confirmarContrasenia.trim(),
      rol: valueFrm.rol.value,
    }
  }

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Registrado', detail: 'El usuario se registro exitosamente.' });
    this.mainComponent.search(this.mainComponent.formCriteria.value);
    this.returnRoute();
  }

  errorMessage(message: string) {
    this.messageService.add({ key: "samePage", severity: 'error', summary: 'Cliente', detail: message });
  }

  returnRoute() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }

  cancel() {
    this.returnRoute();
  }

  private showErrors(force: boolean = false) {
    if (this.genericValidator) {
      this.displayMessage = this.genericValidator.processMessages(this.formNewUser, force);
    }
  }
}
