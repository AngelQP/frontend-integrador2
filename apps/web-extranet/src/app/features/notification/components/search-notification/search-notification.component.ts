import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { GenericValidator, handlerRequestResultResolve, LoadingService, ProductService } from "@tramarsa/xplat/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { map } from 'rxjs/operators';
@Component({
  selector: 'tramarsa-search-notification',
  templateUrl: './search-notification.component.html',
  styleUrls: ['./search-notification.component.scss']
})
export class SearchNotificationComponent implements OnInit {
    ngOnInit(): void {
        throw new Error("Method not implemented.");
    }
}