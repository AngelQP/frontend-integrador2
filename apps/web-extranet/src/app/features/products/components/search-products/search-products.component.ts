import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { GenericValidator } from "@tramarsa/xplat/core";

@Component({
  selector: 'tramarsa-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.scss']
})
export class SearchProductsComponent implements OnInit {

  clientesResult: any;
  _maxResult = 20;
  currentCriteria: any;

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  public formCriteria: FormGroup = this._builder.group({
    nombreCliente: [null],
    tipoDocumento: [null],
    // nroDocumento: [null, [this.peDocumentsValidator.documentValid(this.isDocumentType.bind(this))]],
    pais: [null]
  });

  constructor(private router: Router,
              private _builder: FormBuilder,) {
    this.buildValidation();
  }

  ngOnInit(): void {
    console.log("pantalla listado de productos");
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
    // this.clientesResult = null;
  }

  openNewProduct() {
    this.router.navigate(['/productos/new'])
  }

  openView(cliente: any) {
    this.router.navigate([`/productos/view/${cliente.idCliente}`])
  }

  search(value: any) {
    this.genericValidator?.allValidate(this.formCriteria);
    if (!this.formCriteria.invalid) {
      //this.paginator?.changePage(0);
      this.currentCriteria = value;
      // this._search(this.currentCriteria, 1, this._maxResult);
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
}
