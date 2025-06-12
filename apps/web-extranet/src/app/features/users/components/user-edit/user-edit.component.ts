import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator, handlerRequestResultResolve, LoadingService, UserService } from "@tramarsa/xplat/core";
import { AuthenticationService } from "@tramarsa/xplat/features";
import { ConfirmationService, MessageService } from "primeng/api";
import { map } from "rxjs/operators";
import { SearchUsersComponent } from "..";
import { APP_ROLES_ITEMS } from "../../../shared/constants/menu.config";
import { matchPasswords } from "../common/metods_commons";

@Component({
  selector: 'tramarsa-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  idUsuario!: string;
  user:any;

  originalFormValue: any;
  formChanged = false;

  formEditUser: FormGroup = this._builder.group({
    // usuario: [null, [Validators.required]],
    correo: [null, [Validators.required, Validators.email]],
    nombre: [null, [Validators.required]],
    apellidoPaterno: [null, [Validators.required]],
    apellidoMaterno: [null, [Validators.required]],
    telefono: [null, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    rol: [null, [Validators.required]],
    actualizarContrasenia: [false],
    contrasenia: [null],
    confirmarContrasenia: [null]
  }, {
    validators: matchPasswords('contrasenia', 'confirmarContrasenia')
  });

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  allRoles = APP_ROLES_ITEMS;

  roles: { label: string; value: string }[] = [];

  constructor (private router: Router,
              private _builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private loadingService: LoadingService,
              private userService: UserService,
              private authService: AuthenticationService,
              private mainComponent: SearchUsersComponent,) {
    this.buildValidation();
  }

  buildValidation() {
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idUsuario = params['id'];
      this.getUser(this.idUsuario);
    });

    if (this.authService.isAdminGeneral()) {
      this.roles = this.allRoles;
    } else if (this.authService.isAdminTienda()) {
      this.roles = this.allRoles.filter(r => r.value !== 'ADMIN_GENERAL');
    }

    this.formEditUser.get('actualizarContrasenia')?.valueChanges.subscribe((value) => {
      this.togglePasswordValidators(value);
    });
  }

  togglePasswordValidators(enable: boolean) {
    const contraseniaCtrl = this.formEditUser.get('contrasenia');
    const confirmarCtrl = this.formEditUser.get('confirmarContrasenia');

    if (enable) {
      contraseniaCtrl?.setValidators([Validators.required]);
      confirmarCtrl?.setValidators([Validators.required]);
    } else {
      contraseniaCtrl?.clearValidators();
      confirmarCtrl?.clearValidators();
    }

    contraseniaCtrl?.updateValueAndValidity();
    confirmarCtrl?.updateValueAndValidity();
  }

  getUser(id:any){
    this.userService.userGetById(id, true)
    .pipe(map((r:any)=>{
      const user = r.data;
      if(user){
        this.user = user;

        this.populate(this.user);
      }
    }))
    .subscribe();
  }

  populate(user:any) {
    this.formEditUser.patchValue({
      correo: user.correo,
      nombre: user.nombre,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno,
      telefono: user.telefono,
      rol: this.allRoles.find(x => x.value === user.rol),
      actualizarContrasenia: false
    });

    this.originalFormValue = JSON.stringify(this.formEditUser.getRawValue());

    this.togglePasswordValidators(false);
    this.listenForChanges();
  }

  listenForChanges() {
    this.formEditUser.valueChanges.subscribe(() => {
      const currentValue = JSON.stringify(this.formEditUser.getRawValue());
      this.formChanged = currentValue !== this.originalFormValue;
    });
  }

  isValid() {
    return !this.formEditUser.invalid;
  }

  save() {
    this.showErrors(false);
    if (this.isValid()) {
      this.confirmationService.confirm({
        message: '¿Desea continuar?',
        header: 'Confirmar',
        icon: 'pi pi-info-circle',
        accept: () => {
          const request = this.buildRequest();
          this.userService.updateUser(this.idUsuario, request, true, true)
            .pipe(map((r: any) => {
              handlerRequestResultResolve(
                r, //pasamos el requestResult
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
    const valueFrm = this.formEditUser.value
    const request: any = {
      correo: valueFrm.correo.trim(),
      nombre: valueFrm.nombre.trim(),
      apellidoPaterno: valueFrm.apellidoPaterno.trim(),
      apellidoMaterno: valueFrm.apellidoMaterno.trim(),
      telefono: valueFrm.telefono.trim(),
      rol: valueFrm.rol.value,
      actualizarContrasenia: valueFrm.actualizarContrasenia
    }

    if (valueFrm.actualizarContrasenia) {
      request.contrasenia = valueFrm.contrasenia?.trim() || '';
      request.confirmarContrasenia = valueFrm.confirmarContrasenia?.trim() || '';
    }

    return request;
  }

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Registrado', detail: 'El usuario fue editado exitosamente.' });
    this.mainComponent.search(this.mainComponent.formCriteria.value);
    this.returnRoute();
  }

  errorMessage(message: string) {
    this.messageService.add({ key: "samePage", severity: 'error', summary: 'Usuario', detail: message });
  }

  cancel() {
    this.returnRoute();
  }

  returnRoute() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
  }

  private showErrors(force: boolean = false) {
    if (this.genericValidator) {
      this.displayMessage = this.genericValidator.processMessages(this.formEditUser, force);
    }
  }
}
