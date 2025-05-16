import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator } from "@tramarsa/xplat/core";
import { ConfirmationService } from "primeng/api";

@Component({
  selector: 'tramarsa-supplier-new',
  templateUrl: './supplier-new.component.html',
  styleUrls: ['./supplier-new.component.scss']
})
export class SupplierNewComponent implements OnInit {


  formNewProveedor: FormGroup = this._builder.group({
    nomProveedor: [null, [Validators.required]],
    rucProveedor: [null, [Validators.required]],
    dirProveedor: [null, [Validators.required]],
    // this.peDocumentsValidator.documentValid(this.isDocumentType.bind(this))]],
    telfProveedor: [null, [Validators.required]],
    corProveedor: [null, [Validators.required]],
    conProveedor: [null, [Validators.required]],
    })

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  constructor(private router: Router,
              private _builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,) {

  }

  ngOnInit(): void {
    console.log("pantalla crear proveedor")
  }

  isValid() {
    return !this.formNewProveedor.invalid;
  }

  save() {
    this.showErrors(false);
    if (this.isValid()) {
      this.confirmationService.confirm({
        message: '¿Desea continuar?',
        header: 'Confirmar',
        icon: 'pi pi-info-circle',
        accept: () => {
          // const request = this.buildRequest()
          // this.clientService.create(request, true, true)
          //   .pipe(map((r: any) => {
          //     handlerRequestResultResolve(r, //pasamos el requestResult
          //       () => this.showSuccessMessage(), // esto se ejecuta cuando es success
          //       (message: string) => this.errorMessage(message)) // esto se ejecuta cuando no es success

          //   })).subscribe()
        }
      });
    } else {
      this.showErrors(true);
    }
  }

  returnRoute() {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute })
  }

  cancel() {
    this.returnRoute();
  }

  private showErrors(force: boolean = false) {
    if (this.genericValidator) {
      this.displayMessage = this.genericValidator.processMessages(this.formNewProveedor, force);
    }
  }
}
