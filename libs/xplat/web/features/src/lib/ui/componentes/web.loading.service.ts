import { Injectable } from '@angular/core';
import { LoadingService } from '@tramarsa/xplat/core';

@Injectable()
export class WebLoadingService extends LoadingService {
    
    constructor() 
    {
        super();
    }

    protected OnShow() {
        
    }
    protected OnHide() {
        
    }
}
