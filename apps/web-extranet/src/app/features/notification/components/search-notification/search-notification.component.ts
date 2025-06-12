import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator, handlerRequestResultResolve, LoadingService, ProductService } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { map } from 'rxjs/operators';
@Component({
  selector: 'tramarsa-search-notification',
  templateUrl: './search-notification.component.html',
  styleUrls: ['./search-notification.component.scss']
})
export class SearchNotificationComponent implements OnInit {

  notificationResult: any;
  _maxResult = 20;
  currentCriteria: any;
  notificacionSeleccionadas: string[] = [];messageService: any;
  confirmationService: any;
;
  usuarios: any[] = [];
  tiposNotificacion = [
    { label: 'Correo', value: 'correo' },
    { label: 'SMS', value: 'sms' }
  ];


  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};
  public formCriteria: FormGroup = this._builder.group({
    sku: [null],
    nombre: [null],
    categoria: [null],
    proveedor: [null],
    stock: [null],
    precioUnitario: [null]

  });

    constructor(private router: Router,
              private _builder: FormBuilder,
              private productService: ProductService
            ) {
    this.buildValidation();
  }
    buildValidation() {
      this.genericValidator = new GenericValidator(this.validationMessages);
    }
  ngOnInit(): void {
        this.loadUsuarios();
        // this.loadProveedores();
    console.log("pantalla de configuracion de Notificaciones");
  }

    clear() {
    this.resetForm();
  }
    private resetForm() {
    this.formCriteria.reset();
    this.showErrors(false);
    this.currentCriteria = null;
    this.notificationResult = null;
  }
  private showErrors(force: boolean = false) {
    if (this.genericValidator) {
      this.displayMessage = this.genericValidator.processMessages(this.formCriteria, force);
    }
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
loadUsuarios() {
  const seleccionadosCorreos: number[] = JSON.parse(localStorage.getItem('usuariosSeleccionadosNotif') || '[]');

  this.productService.getUsuariosLite().subscribe((res: any) => {
    this.usuarios = (res.data || []).map((u: any) => ({
      id: u.idUsuario,
      nombre: u.nombre,
      correo: u.correo,
      rol: u.rol,
      seleccionado: seleccionadosCorreos.includes(u.correo)
    }));
  });
}
    private _search(value: any, startAt: number, maxResult: number) {
    this.productService
      .searchProducts(value.nombre,
      value.categoria?.label ?? null,
      value.proveedor?.label ?? null,
      startAt,
      maxResult,
      true)
        .pipe(map((b: any) => {
          this.notificationResult = b.data;
        }))
        .subscribe();
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
  openNewInventory() {
    this.router.navigate(['/notificacion/new'])
  }
  openEdit(notification: any) {
    this.router.navigate([`/notificacion/edit/${notification.idProducto}`])
  }
    paginate(event: any, value: any): void {
    this.currentCriteria = value;
    if (this.currentCriteria) {
      // this._search(this.currentCriteria, event.page * this._maxResult, this._maxResult);
    }
  }
guardarSeleccion() {
  const seleccionadosCorreos = this.usuarios
    .filter(u => u.seleccionado)
    .map(u => u.correo);

  localStorage.setItem('usuariosSeleccionadosNotif', JSON.stringify(seleccionadosCorreos));

  this.messageService.add({
    severity: 'success',
    summary: 'Guardado',
    detail: `${seleccionadosCorreos .length} usuario(s) seleccionado(s)`
  });
}
limpiarSeleccion() {
  localStorage.removeItem('usuariosSeleccionadosNotif');
  this.usuarios.forEach(u => u.seleccionado = false);
}

}