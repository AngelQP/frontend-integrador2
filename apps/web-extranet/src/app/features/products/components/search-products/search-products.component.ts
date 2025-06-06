import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator, ProductService } from "@tramarsa/xplat/core";
import { map } from "rxjs/operators";

@Component({
  selector: 'tramarsa-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  productResult: any;
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
              private productService: ProductService// ProductService
            ) {
    this.buildValidation();
  }

  ngOnInit(): void {
        this.loadCategorias();
        this.loadProveedores(); 
    console.log("pantalla listado de productos");
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

  private showErrors(force: boolean = false) {
    if (this.genericValidator) {
      this.displayMessage = this.genericValidator.processMessages(this.formCriteria, force);
    }
  }

  private resetForm() {
    this.formCriteria.reset();
    this.showErrors(false);
    this.currentCriteria = null;
    this.productResult = null;
  }

  openNewProduct() {
    this.router.navigate(['/productos/new'])
  }

  openEdit(product: any) {
    this.router.navigate([`/productos/edit/${product.idProducto}`])
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
      // this._search(this.currentCriteria, event.page * this._maxResult, this._maxResult);
    }
  }

  clear() {
    this.resetForm();
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
          this.productResult = b.data;
        }))
        .subscribe();
  }
}
