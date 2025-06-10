import { Component, OnInit } from "@angular/core";
import { EmailValidator, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { SearchSuppliersComponent } from "../search-suppliers/search-suppliers.component";

@Component({
  selector: 'tramarsa-supplier-new',
  templateUrl: './supplier-new.component.html',
  styleUrls: ['./supplier-new.component.scss']
})
export class SupplierNewComponent implements OnInit {


  formNewProveedor: FormGroup = this._builder.group({
    RSProveedor: [null, [Validators.required]],
    rucProveedor: [null, [Validators.required, Validators.pattern('^(10|15|16|17|20)[0-9]{9}$')]],
    telfProveedor: [null, [Validators.required, Validators.pattern('^[0-9]{9}$')]],
    corProveedor: [null, [Validators.required,  Validators.email]],
    })

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  constructor(private router: Router,
              private _builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private mainComponent: SearchSuppliersComponent,) {
                this.buildValidation();
  }

  ngOnInit(): void {
    console.log("pantalla crear proveedor")
  }

  buildValidation() {
    this.genericValidator = new GenericValidator(this.validationMessages);
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

  buildRequest(){
    const valueFrm = this.formNewProveedor.value
    return{
      RSProveedor: valueFrm.RSProveedor.trim(),
      rucProveedor: valueFrm.rucProveedor.trim(),
      telfProveedor: valueFrm.telfProveedor.trim(),
      corProveedor: valueFrm.corProveedor.trim(),
    }
  }

  showSuccessMessage() {
    this.messageService.add({ severity: 'success', summary: 'Registrado', detail: 'El usuario se registro exitosamente.' });
    this.mainComponent.search(this.mainComponent.formCriteria.value);
    this.returnRoute();
  }

  errorMessage(message: string) {
    this.messageService.add({ key: "samePage", severity: 'error', summary: 'Proveedor', detail: message });
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
