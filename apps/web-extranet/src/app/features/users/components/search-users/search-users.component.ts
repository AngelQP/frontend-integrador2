import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator, UserService } from "@tramarsa/xplat/core";
import { AuthenticationService } from "@tramarsa/xplat/features";
import { ConfirmationService, MessageService } from "primeng/api";
import { map } from "rxjs/operators";
import { APP_SOCIEDAD_ITEMS } from "../../../shared/constants/menu.config";

@Component({
  selector: 'tramarsa-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})
export class SearchUsersComponent implements OnInit {

  userResult: any;
  _maxResult = 20;
  currentCriteria: any;
  roles = [
    { label: 'Administrador General', value: 'ADMIN_GENERAL' },
    { label: 'Administrador Tienda', value: 'ADMIN_TIENDA' },
    { label: 'Cajero', value: 'CAJERO' }
  ];

  estados = [
    { label: 'Activo', value: 1 },
    { label: 'Inactivo', value: 0 }
  ];

  sociedad: string | undefined;
  sociedades:any;

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  public formCriteria: FormGroup = this._builder.group({
    sociedad: [null],
    nombreUsuario: [null],
    rol: [null],
    estado: [null]
  });

  constructor(private router: Router,
              private _builder: FormBuilder,
              private userService: UserService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private authenticationService: AuthenticationService,) {
    this.buildValidation();
  }

  ngOnInit(): void {
    this.sociedad = this.authenticationService.sociedad();
    this.sociedades = APP_SOCIEDAD_ITEMS;
    console.log("pantalla listado de usuarios");
  }

  buildValidation() {
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  private showErrors(force: boolean = false) {
    if (this.genericValidator) {
      this.displayMessage = this.genericValidator.processMessages(this.formCriteria, force);
    }
  }

  private resetForm() {
    this.formCriteria.reset();
    this.showErrors(false);
    this.currentCriteria = null;
    this.userResult = null;
  }

  openNewProduct() {
    this.router.navigate(['/usuarios/new'])
  }

  openView(user: any) {
    this.router.navigate([`/usuarios/view/${user.id}`])
  }

  search(value: any) {
    this.genericValidator?.allValidate(this.formCriteria);
    if (!this.formCriteria.invalid) {
      //this.paginator?.changePage(0);
      this.currentCriteria = value;
      this._search(this.currentCriteria, 1, this._maxResult);
      this.showErrors(false);
    }
    else {
      this.showErrors(true);
    }
  }

  download(value: any) {
    this.currentCriteria = value;
    if (this.currentCriteria) {
      this.userService
        .downloadSearch(value.nombreUsuario, value.rol?.value, value.estado?.value, true)
        .pipe(map((b: any) => {
          const url = window.URL.createObjectURL(b.content);
          const anchor = document.createElement("a");
          anchor.download = b.filename;
          anchor.href = url;
          anchor.click();
        }))
        .subscribe();
    }
  }

  paginate(event: any, value: any): void {
    this.currentCriteria = value;
    if (this.currentCriteria) {
      this._search(this.currentCriteria, event.page * this._maxResult, this._maxResult);
    }
  }

  clear() {
    this.resetForm();
  }

  private _search(value: any, startAt: number, maxResult: number) {
    const sociedad = this.sociedad == "ANY" ? value.sociedad?.value : this.sociedad;
    this.userService
      .searchUsers(sociedad, value.nombreUsuario, value.rol?.value, value.estado?.value, startAt, maxResult, true)
      .pipe(map((r: any) => {
        this.userResult = r.data;
      }))
      .subscribe();
  }

  openEdit(user:any){
    this.router.navigate([`/usuarios/edit/${user.idUsuario}`])
  }

  deactivateUser(user: any) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea desactivar este usuario?',
      header: 'Confirmar desactivación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.userChangeState(user.idUsuario, 0, true)
          .subscribe(() => {
            this.showSuccessMessage('Usuario desactivado correctamente.');
          });
      }
    });
  }

  activateUser(user: any) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea activar este usuario?',
      header: 'Confirmar activación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.userService.userChangeState(user.idUsuario, 1, true)
          .subscribe(() => {
            this.showSuccessMessage('Usuario activado correctamente.');
          });
      }
    });
  }

  showSuccessMessage(message:any) {
    this.messageService.add({ severity: 'success', summary: 'Cambio de estado', detail: message });
    this.search(this.formCriteria.value);
  }
}
