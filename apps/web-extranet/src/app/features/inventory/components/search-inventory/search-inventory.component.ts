import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator, ProductService } from "@tramarsa/xplat/core";
import { map } from "rxjs/operators";

@Component({
  selector: 'tramarsa-search-inventory',
  templateUrl: './search-inventory.component.html',
  styleUrls: ['./search-inventory.component.scss']
})
export class SearchInventoryComponent implements OnInit {

  inventoryResult: any;
  _maxResult = 20;
  currentCriteria: any;
  categoria: any[] = [];
  proveedor : any[] = [];

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
        this.loadCategorias();
        this.loadProveedores(); 
    console.log("pantalla listado de Inventario");
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
    clear() {
    this.resetForm();
  }
    private resetForm() {
    this.formCriteria.reset();
    this.showErrors(false);
    this.currentCriteria = null;
    this.inventoryResult = null;
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
    private _search(value: any, startAt: number, maxResult: number) {
    this.productService
      .searchProducts(value.nombre,
      value.categoria?.label ?? null,   
      value.proveedor?.label ?? null,  
      startAt,
      maxResult,
      true)
        .pipe(map((b: any) => {
          this.inventoryResult = b.data;
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
    this.router.navigate(['/inventario/new'])
  }
  openEdit(inventory: any) {
    this.router.navigate([`/inventario/edit/${inventory.idInventario}`])
  }
    paginate(event: any, value: any): void {
    this.currentCriteria = value;
    if (this.currentCriteria) {
      // this._search(this.currentCriteria, event.page * this._maxResult, this._maxResult);
    }
  }
  onAdd(inventory: any) {
  this.router.navigate([`/inventario/edit/${inventory.idInventario}`])
}

onRemove(inventory: any) {
  // Lógica para quitar
}
}