import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WebLoadingService } from '@tramarsa/xplat/web/features'
import { ClientService, HandlerErrorService, HttpClientService, LoadingService, MasterService, UserService, FileBlobService, SobreestadiaService, MenuService, ProductService } from '@tramarsa/xplat/core'
// app
import { CoreModule } from './core/core.module';
import { SharedModule } from './features/shared/shared.module';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { FilteringMasterService, SecurityModule } from '@tramarsa/xplat/features';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';

@NgModule({
  imports: [AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    SecurityModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: LoadingService, useClass: WebLoadingService },
    HttpClientService,
    MasterService,
    UserService,
    MenuService,
    FileBlobService,
    ClientService,
    FilteringMasterService,
    SobreestadiaService,
    HandlerErrorService,
    ProductService]
})
export class AppModule {
  constructor(translate: TranslateService, private config: PrimeNGConfig) {
    translate.get('primeng').subscribe(res => config.setTranslation(res));
  }
}
