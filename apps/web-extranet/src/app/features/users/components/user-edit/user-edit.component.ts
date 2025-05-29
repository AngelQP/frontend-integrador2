import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator, LoadingService, UserService } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { map } from "rxjs/operators";

@Component({
  selector: 'tramarsa-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user:any;

  formEditUser: FormGroup = this._builder.group({
    // usuario: [null, [Validators.required]],
    correo: [null, [Validators.required]],
    nombre: [null, [Validators.required]],
    apellidoPaterno: [null, [Validators.required]],
    apellidoMaterno: [null, [Validators.required]],
    telefono: [null, [Validators.required]],
    contrasenia: [null, [Validators.required]],
    confirmarContrasenia: [null, [Validators.required]],
    // rol: [null, [Validators.required]],
  });

  public genericValidator?: GenericValidator;
  public validationMessages: { [key: string]: { [key: string]: string } } = {};
  public displayMessage: { [key: string]: string; } = {};

  constructor (private router: Router,
              private _builder: FormBuilder,
              private activatedRoute: ActivatedRoute,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private loadingService: LoadingService,
              private userService: UserService) {
    this.buildValidation();
  }

  buildValidation() {
    this.genericValidator = new GenericValidator(this.validationMessages);
  }

  ngOnInit(): void {
    this.activatedRoute
    .params
    .pipe(map(p => this.getUser(p.id)))
    .subscribe();
  }

  getUser(id:any){
    this.userService.userGetById(id, true)
    .pipe(map((r:any)=>{
      const user = r.data;
      if(user){
        this.user = user;

        this.populate(this.user);
      }
    }))
    .subscribe();
  }

  populate(user:any) {
    this.formEditUser.patchValue({
      correo: user.correo,
      nombre: user.nombre,
      apellidoPaterno: user.apellidoPaterno,
      apellidoMaterno: user.apellidoMaterno,
      telefono: user.telefono,
    })
  }

  isValid() {
    return !this.formEditUser.invalid;
  }

  save() {
    this.showErrors(false);
    if (this.isValid()) {
      // const request = this.buildRequest()
      // this.confirmationService.confirm({
      //   message: '¿Desea continuar?',
      //   header: 'Confirmar',
      //   icon: 'pi pi-info-circle',
      //   accept: () => {

      //     this.clientService.update(request, true, true)
      //       .pipe(map((r: any) => {
      //         handlerRequestResultResolve(
      //           r, //pasamos el requestResult
      //           () => this.showSuccessMessage(), // esto se ejecuta cuando es success
      //           (message: string) => this.errorMessage(message)) // esto se ejecuta cuando no es success

      //       })).subscribe()
      //   }
      // });
    } else {
      this.showErrors(true);
    }
  }

  cancel() {
    this.returnRoute();
  }

  returnRoute() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
  }

  private showErrors(force: boolean = false) {
    if (this.genericValidator) {
      this.displayMessage = this.genericValidator.processMessages(this.formEditUser, force);
    }
  }
}
