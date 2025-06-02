import { Component, OnInit } from "@angular/core";
import { EmailValidator, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator, handlerRequestResultResolve, UserService } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { map } from "rxjs/operators";
import { SearchUsersComponent } from "../search-users/search-users.component";
import { AuthenticationService } from "@tramarsa/xplat/features";
import { APP_ROLES_ITEMS } from "../../../shared/constants/menu.config";
import { matchPasswords } from "../common/metods_commons";

@Component({
  selector: 'tramarsa-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  formNewUser: FormGroup = this._builder.group({
    // usuario: [null, [Validators.required]],
    correo: [null, [Validators.required, Validators.email]],
    nombre: [null, [Validators.required]],
    apellidoPaterno: [null, [Validators.required]],
    apellidoMaterno: [null, [Validators.required]],
    telefono: [null, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    contrasenia: [null, [Validators.required]],
    confirmarContrasenia: [null, [Validators.required]],
    rol: [null, [Validators.required]],
  }, {
    validators: matchPasswords('contrasenia', 'confirmarContrasenia')
  });

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  allRoles = APP_ROLES_ITEMS;

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
                r,
                () => this.showSuccessMessage(),
                (message: string) => this.errorMessage(message))

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
    this.messageService.add({ key: "samePage", severity: 'error', summary: 'Usuario', detail: message });
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
