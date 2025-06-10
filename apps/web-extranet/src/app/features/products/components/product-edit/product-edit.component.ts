import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator, handlerRequestResultResolve, LoadingService, ProductService } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { map } from 'rxjs/operators';
import { APP_IMPUESTO_ITEMS } from "../../../shared/constants/menu.config";
import { SearchProductsComponent } from "../search-products/search-products.component";

@Component({
  selector: 'tramarsa-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  idProducto!: string;
  product:any;

  originalFormValue: any;
  formChanged = false;

  formEditProduct: FormGroup = this._builder.group({
    nombre: [null, [Validators.required]],
    descripcion: [null],
    marca: [null, [Validators.required]],
    modelo: [null, [Validators.required]],
    sku: [null, [Validators.required]],
    unidadMedida: [null, [Validators.required]],
    categoria: [null, [Validators.required]],
    subcategoria: [null],
    impuestoTipo: [null, [Validators.required]],
    precioUnitario: [null, [Validators.required]],
    stock: [null, [Validators.required]],
    costo: [null, [Validators.required]],
    codigoBarra: [null, [Validators.required]],
    usuarioCreacion: [null],
    proveedor: [null, [Validators.required]],
    estado: [true, [Validators.required]],

  })

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  categorias: any[] = [];
  allImpuestos=APP_IMPUESTO_ITEMS;
  impuestos: { label: string; value: string }[] = [];

  constructor (private router: Router,
              private _builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private loadingService: LoadingService,
              private mainComponent: SearchProductsComponent,) {
    this.buildValidation();
  }

  buildValidation() {
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

ngOnInit(): void {
  this.productService.getCategoriasLite().subscribe(res => {
    this.categorias = res.data.map((cat: any) => ({
      label: cat.nombre,
      value: cat.idCategoria
    }));

    this.activatedRoute.params.subscribe(params => {
      this.idProducto = params['id'];
      if (this.idProducto) {
        this.getProduct(this.idProducto);
      }
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
      this.formEditProduct.patchValue({
        nombre: product.nombre ?? '',
        descripcion: product.descripcion ?? '',
        marca: product.marca ?? '',
        modelo: product.modelo ?? '',
        sku: product.sku ?? '',
        unidadMedida: product.unidadMedida ?? '',
        categoria: categoriaId,
        subcategoria:product.subcategoria ?? '',
        impuestoTipo: this.allImpuestos.find(x => x.value === product.impuestoTipo) ?? null,
        precioUnitario: product.precioUnitario ?? product.precio ?? '',
        stock: product.stock ??product.cantidad ?? '',
        costo: product.costo ?? '',
        codigoBarra: product.codigoBarra ?? '',
        usuarioCreacion: product.usuarioCreacion ?? '',
        proveedor: product.proveedor ? { label: product.proveedorNombre, value: product.proveedor } : null,
        estado: product.estado ?? true,
      });
          this.originalFormValue = JSON.stringify(this.formEditProduct.getRawValue());

    this.listenForChanges();
    }
  listenForChanges() {
    this.formEditProduct.valueChanges.subscribe(() => {
      const currentValue = JSON.stringify(this.formEditProduct.getRawValue());
      this.formChanged = currentValue !== this.originalFormValue;
    });
  }
  isValid() {
    return !this.formEditProduct.invalid;
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
          this.productService.updateProduct(this.idProducto, request, true, true)
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
  const formValue = this.formEditProduct.value;
let categoriaNombre = formValue.categoria;
if (typeof formValue.categoria === 'number' || typeof formValue.categoria === 'string') {
  const catObj = this.categorias.find(cat => cat.value === formValue.categoria);
  if (catObj) {
    categoriaNombre = catObj.label;
  }
} else if (typeof formValue.categoria === 'object' && formValue.categoria !== null) {
  categoriaNombre = formValue.categoria.label;
}
  const request: any = {
    idProducto: this.idProducto,
    nombre: formValue.nombre,
    descripcion: formValue.descripcion,
    marca: formValue.marca,
    modelo: formValue.modelo,
    sku: formValue.sku,
    unidadMedida: formValue.unidadMedida,
    categoria: categoriaNombre, 
    subcategoria: formValue.subcategoria,
    impuestoTipo: formValue.impuestoTipo ? formValue.impuestoTipo.value || formValue.impuestoTipo : null,
    precioUnitario: formValue.precioUnitario,
    stock: Number(formValue.stock),
    costo: formValue.costo,
    codigoBarra: formValue.codigoBarra,
    usuarioCreacion: formValue.usuarioCreacion,
    proveedor: formValue.proveedor ? formValue.proveedor.value || formValue.proveedor : null,
    estado: formValue.estado,
  }
  return request;
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
      this.displayMessage = this.genericValidator.processMessages(this.formEditProduct, force);
    }
  }
}
