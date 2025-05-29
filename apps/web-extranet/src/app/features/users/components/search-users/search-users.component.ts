import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator, UserService } from "@tramarsa/xplat/core";
import { map } from "rxjs/operators";

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

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  public formCriteria: FormGroup = this._builder.group({
    nombreUsuario: [null],
    rol: [null],
    estado: [null]
  });

  constructor(private router: Router,
              private _builder: FormBuilder,
              private userService: UserService) {
    this.buildValidation();
  }

  ngOnInit(): void {
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
      // this.clientService
      //   .downloadSearch(value.nombreCliente, value.tipoDocumento?.codigoDetalle, value.nroDocumento, value.pais?.codigoPais, true)
      //   .pipe(map((b: any) => {
      //     const url = window.URL.createObjectURL(b.content);
      //     const anchor = document.createElement("a");
      //     anchor.download = b.filename;
      //     anchor.href = url;
      //     anchor.click();
      //   }))
      //   .subscribe();
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
    this.userService
      .searchUsers(value.nombreUsuario, startAt, maxResult, true)
      .pipe(map((r: any) => {
        this.userResult = r.data;
      }))
      .subscribe();
  }

  openEdit(user:any){
    this.router.navigate([`/usuarios/edit/${user.idUsuario}`])
  }

  confirmDelete(user:any) {
    console.log("El usuario ha sido eliminado");
  }
}
