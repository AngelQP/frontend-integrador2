import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator, handlerRequestResultResolve, LoadingService, ProductService } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { map } from 'rxjs/operators';
import { APP_IMPUESTO_ITEMS } from "../../../shared/constants/menu.config";
import { SearchInventoryComponent } from "../search-inventory/search-inventory.component";
@Component({
  selector: 'tramarsa-inventory-edit',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.scss']
})
export class InventoryEditComponent implements OnInit {

  idProducto!: string;
  product:any;
  modo: 'agregar' | 'descontar' = 'agregar';
  titulo = 'Agregar Stock a producto';
  originalFormValue: any;
  formChanged = false;

  formEditInventory: FormGroup = this._builder.group({
    nombre: [null, [Validators.required]],
    descripcion: [null],
    marca: [null, [Validators.required]],
    modelo: [null, [Validators.required]],
    sku: [null, [Validators.required]],
    unidadMedida: [null, [Validators.required]],
    categoria: [null],
    subcategoria: [null],
    impuestoTipo: [null, [Validators.required]],
    precioUnitario: [null],
    stock: [null, [Validators.required]],
    costo: [null, [Validators.required]],
    codigoBarra: [null],
    usuarioCreacion: [null],
    proveedor: [null, [Validators.required]],
    estado: [true, [Validators.required]],
    numeroLote: [null, [Validators.required]],
    fechaIngreso: [null, [Validators.required]],
    fechaFabricacion: [null],
    fechaVencimiento: [null],
    cantidadInicial: [null, [Validators.required]],
    cantidadDisponible: [null],
    costoUnitario: [null],
  })

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  categorias: any[] = [];
  proveedores: any[] = [];
  allImpuestos=APP_IMPUESTO_ITEMS;
  impuestos: { label: string; value: string }[] = [];

  constructor (private router: Router,
              private _builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private loadingService: LoadingService,
              private mainComponent: SearchInventoryComponent,) {
    this.buildValidation();
  }

  buildValidation() {
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
    if (params['modo'] === 'descontar') {
      this.setModo('descontar');
    } else {
      this.setModo('agregar');
    }
  });
  this.productService.getCategoriasLite().subscribe(res => {
    this.categorias = res.data.map((cat: any) => ({
      label: cat.nombre,
      value: cat.idCategoria
    }));

    // Cargar proveedores aquí
    this.productService.getProveedoresLite().subscribe(resProv => {
      console.log('Proveedores recibidos:', resProv.data);
      this.proveedores = resProv.data.map((prov: any) => ({
        label: prov.razonSocial,
        value: prov.idProveedor
      }));

      // Ahora sí, obtener el producto
      this.activatedRoute.params.subscribe(params => {
        this.idProducto = params['id'];
        if (this.idProducto) {
          this.getProduct(this.idProducto);
        }
      });
    });
  });
}
    getProduct(id:any){
      this.productService.ProductGetById(id, true)
      .pipe(map((r:any)=>{
        const product = r.data;
        if(product){
          this.product = product;
  
          this.populate(this.product);
        }
      }))
      .subscribe();
    }

    populate(product: any) {
        const categoriaObj = this.categorias.find(cat => cat.label === product.categoria);
        const categoriaId = categoriaObj ? categoriaObj.value : null;
      this.formEditInventory.patchValue({
        nombre: product.nombre ?? '',
        marca: product.marca ?? '',
        modelo: product.modelo ?? '',
        sku: product.sku ?? '',
        unidadMedida: product.unidadMedida ?? '',
        // categoria: categoriaId,
        subcategoria:product.subcategoria ?? '',
        impuestoTipo: this.allImpuestos.find(x => x.value === product.impuestoTipo) ?? null,
        precioUnitario: product.precioUnitario ?? '',
        stock: product.stock ?? '',
        costo: product.costo ?? '',
        codigoBarra: product.codigoBarra ?? '',
        usuarioCreacion: product.usuarioCreacion ?? '',
        proveedor: product.proveedor ? { label: product.proveedorNombre, value: product.proveedor } : null,
        estado: product.estado ?? true,
      });
          this.originalFormValue = JSON.stringify(this.formEditInventory.getRawValue());

    this.listenForChanges();
    }
  listenForChanges() {
    this.formEditInventory.valueChanges.subscribe(() => {
      const currentValue = JSON.stringify(this.formEditInventory.getRawValue());
      this.formChanged = currentValue !== this.originalFormValue;
    });
  }
  isValid() {
    return !this.formEditInventory.invalid;
  }

save() {
  this.showErrors(false);
  console.log('Intentando guardar...', this.formEditInventory.value, this.isValid());
  if (this.isValid()) {
    this.confirmationService.confirm({
      message: '¿Desea continuar?',
      header: 'Confirmar',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log('Confirmado, enviando request...');
        const request = this.buildRequest();
        this.productService.createLote(request, true)
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
    console.log('Formulario inválido', this.formEditInventory.errors, this.formEditInventory.value);
  }
}
buildRequest() {
  const formValue = this.formEditInventory.value;
  return {
    idProducto: this.idProducto,
    numeroLote: formValue.numeroLote,
    fechaIngreso: formValue.fechaIngreso ? new Date(formValue.fechaIngreso).toISOString() : null,
    fechaFabricacion: formValue.fechaFabricacion ? new Date(formValue.fechaFabricacion).toISOString() : null,
    fechaVencimiento: formValue.fechaVencimiento ? new Date(formValue.fechaVencimiento).toISOString() : null,
    cantidadInicial: Number(formValue.cantidadInicial),
    cantidadDisponible: Number(formValue.cantidadDisponible),
    costoUnitario: Number(formValue.costo),
    estadoRegistro: 1,
    usuarioCreacion: formValue.usuarioCreacion,
    fechaCreacion: new Date().toISOString(),
    idProveedor: formValue.proveedor ? (formValue.proveedor.value || formValue.proveedor) : null
  };
}

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Registrado', detail: 'El Producto fue editado exitosamente.' });
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
      this.displayMessage = this.genericValidator.processMessages(this.formEditInventory, force);
    }
  }
    setModo(modo: 'agregar' | 'descontar') {
    this.modo = modo;
    this.titulo = modo === 'agregar' ? 'Agregar Stock a producto' : 'Descontar stock';
  }
}
