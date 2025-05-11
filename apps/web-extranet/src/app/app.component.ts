import { Component } from '@angular/core';
import { HandlerErrorService, LoadingService } from '@tramarsa/xplat/core';
import { findHighestZIndex } from '@tramarsa/xplat/web/core';

// xplat
import { AppBaseComponent } from '@tramarsa/xplat/web/features';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'tramarsa-root',
  templateUrl: './app.component.html',
})
export class AppComponent extends AppBaseComponent {
  
  _zindex:any=0

  _errorData?: any

  _showSpinner = false;

  _show$ = this.loadingService.progress$.pipe(tap((value: any)=>{
    window.setTimeout(()=>{
      this._zindex=findHighestZIndex('div')
      this._showSpinner= value;
    });
  })).subscribe()
  
  _showHandlerError$ = this.handlerError.handler$.pipe(tap((err:any)=>{
    if (err){
      this._zindex = findHighestZIndex('div') + 1
      this._errorData = err;
    }
    
  })).subscribe()

  constructor(private loadingService: LoadingService, private handlerError: HandlerErrorService) {
    super();
  }

  close(){
    if (this._errorData?.action?.close)
    {
      this._errorData?.action.close(this._errorData);
    }
    this._errorData = null;
  }
  
}
