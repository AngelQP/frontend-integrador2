import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";

@Component({
  selector: 'tramarsa-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {

  cliente: any

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    console.log("pantal vista")
    // this.activatedRoute
    //   .params
    //   .pipe(map(p => this.getCliente(p.id)))
    //   .subscribe();
  }

  showSuccessMessage(summary: string, detail: string) {
    this.messageService.add({ severity: 'warn', summary: summary, detail: detail });
    // this.mainComponent.search(this.mainComponent.formCriteria.value);
    this.returnRoute();
  }

  errorMessage(message: string) {
    this.messageService.add({ key: "samePage", severity: 'error', summary: 'Cliente', detail: message });
  }

  close() {
    this.returnRoute();
  }
  returnRoute() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute })
  }

}
