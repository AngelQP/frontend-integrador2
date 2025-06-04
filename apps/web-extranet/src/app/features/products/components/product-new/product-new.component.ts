import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs/operators";
import { GenericValidator, handlerRequestResultResolve, ProductService } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { APP_IMPUESTO_ITEMS } from "../../../shared/constants/menu.config";

@Component({
  selector: 'tramarsa-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.scss']
})
export class ProductNewComponent implements OnInit {


  formNewProduct: FormGroup = this._builder.group({
    nombre: [null, [Validators.required]],
    descripcion: [null],
    marca: [null, [Validators.required]],
    // this.peDocumentsValidator.documentValid(this.isDocumentType.bind(this))]],
    modelo: [null, [Validators.required]],
    sku: [null, [Validators.required]],
    unidad: [null, [Validators.required]],
    categoria: [null, [Validators.required]],
    subcategoria: [null],
    impuestoTipo: [null, [Validators.required]],
    precio: [null, [Validators.required]],
    cantidad: [null, [Validators.required]],
    costo: [null, [Validators.required]],
    codigoBarras: [null, [Validators.required]],
    usuarioCreacion: [null],
    proveedor: [null, [Validators.required]]

  })
  categoria: any[] = [];
  proveedor : any[] = [];
  allImpuesto = APP_IMPUESTO_ITEMS;

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  constructor(private router: Router,
              private _builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private productService: ProductService,
              private messageService: MessageService) {
  this.buildValidation();
  }

  ngOnInit(): void {
    this.loadCategorias();
    this.loadProveedores();
    console.log("pantalla crear producto")
  }
  loadCategorias() {
    this.productService.getCategoriasLite().subscribe((res: any) => {
      this.categoria = (res.data || []).map((cat: any) => ({
        label: cat.nombre,
        value: cat.idCategoria
      }));
    });
  }
  loadProveedores() {
    this.productService.getProveedoresLite().subscribe((res: any) => {
      this.proveedor = (res.data || []).map((prov: any) => ({
        label: prov.razonSocial,
        value: prov.idProveedor
      }));
    });
  }
    buildValidation() {
      this.genericValidator = new GenericValidator(this.validationMessages);
    }

  isValid() {
    return !this.formNewProduct.invalid;
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
        this.productService.createProduct(request, true, true)
          .pipe(
            map((r: any) => {
              handlerRequestResultResolve(
                r,
                () => this.showSuccessMessage(),
                (message: string) => this.errorMessage(message)
              );
            })
          ).subscribe();
      }
    });
  } else {
    this.showErrors(true);
  }
}
buildRequest() {
  const valueFrm = this.formNewProduct.value
  return {
    nombre: valueFrm.nombre?.trim() ?? '',
    descripcion: valueFrm.descripcion?.trim() ?? '',
    marca: valueFrm.marca?.trim() ?? '',
    modelo: valueFrm.modelo?.trim() ?? '',
    sku: valueFrm.sku?.trim() ?? '',
    unidad: valueFrm.unidad?.trim() ?? '',
    categoria: valueFrm.categoria?.value ?? null,
    subcategoria: valueFrm.subcategoria?.trim() ?? '',
    impuestoTipo: valueFrm.impuestoTipo?.value ?? null,
    precio: valueFrm.precio?.trim() ?? '',
    cantidad: valueFrm.cantidad?.trim() ?? '',
    costo: valueFrm.costo?.trim() ?? '',
    codigoBarras: valueFrm.codigoBarras?.trim() ?? '',
    usuarioCreacion: valueFrm.usuarioCreacion?.trim() ?? '',
    proveedor: valueFrm.proveedor?.value ?? null
  };
}

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Registrado', detail: 'El producto se registró exitosamente.' });
    this.returnRoute();
  }

  errorMessage(message: string) {
  this.messageService.add({ key: "samePage", severity: 'error', summary: 'Producto', detail: message });
}
  returnRoute() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }

  cancel() {
    this.returnRoute();
  }

  private showErrors(force: boolean = false) {
    if (this.genericValidator) {
      this.displayMessage = this.genericValidator.processMessages(this.formNewProduct, force);
    }
  }
}
