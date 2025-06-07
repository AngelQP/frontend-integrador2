import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator, handlerRequestResultResolve, LoadingService, ProductService } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { map } from 'rxjs/operators';
@Component({
  selector: 'tramarsa-inventory-new',
  templateUrl: './inventory-new.component.html',
  styleUrls: ['./inventory-new.component.scss']
})
export class InventoryNewComponent implements OnInit {
    formInventory!: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private productService: ProductService,
        private messageService: MessageService,
        private loadingService: LoadingService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.formInventory = this.fb.group({
            nombre: ['', Validators.required],
            categoria: [null, Validators.required],
            stock: [0, Validators.required],
            // ...otros campos...
        });
    }
}