import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { finalize, catchError } from 'rxjs/operators';
import { LoadingService } from './loading.service';
import { HandlerErrorService, ServerErrorAction } from './handler-error.service';

@Injectable()
export class HttpClientService {

    constructor(private httpClient: HttpClient, 
                private loadingService: LoadingService,
                private handlerError: HandlerErrorService ) { }
    
    get(url: string, params: HttpParams = new HttpParams(), progress: boolean=false, handlerEnable: boolean|ServerErrorAction=false) : Observable<any>{

        return this.wrapObservable
            (
                this.httpClient.get(url, { params }),
                progress,
                handlerEnable
            );
    }
    getBlob(url: string, progress: boolean=false, handlerEnable: boolean|ServerErrorAction=false) : Observable<any>{

        return this.wrapObservable
            (
                this.httpClient.get(url, { observe: 'response',responseType: 'blob'}),
                progress,
                handlerEnable
            );
    }

    delete(url: string, params: HttpParams = new HttpParams(), progress: boolean=false, handlerEnable:  boolean|ServerErrorAction=false) : Observable<any>{
        
        return this.wrapObservable
            (
                this.httpClient.delete(url, { params }),
                progress,
                handlerEnable
            );
        
    }

    post(url: string, body: Object = {}, options?: any, progress: boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{

        return this.wrapObservable
            (
                this.httpClient.post(url, body, options),
                progress,
                handlerEnable
            );
        
    }

    put(url: string, body: Object = {}, progress: boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any> {
        
        return this.wrapObservable
            (
                this.httpClient.put(url, body),
                progress,
                handlerEnable
            );
    }

    patch(url: string, body: Object = {}, progress: boolean=false, handlerEnable: boolean|ServerErrorAction=false): Observable<any> {
        
        return this.wrapObservable
            (
                this.httpClient.patch(url, body),
                progress,
                handlerEnable
            );
    }

    private wrapObservable(observable: Observable<any>, progress: boolean, handlerEnable: boolean|ServerErrorAction=false): Observable<any>{
        
        
        let robservable = observable;
        if (progress){
            try {
                this.loadingService.show();
                robservable = observable.pipe(finalize(()=> this.loadingService.hide()))
            } catch (error) {
                this.loadingService.hide()
                throw error;
            }
        }
        if (handlerEnable)
        {
            let h :ServerErrorAction;
            if (typeof handlerEnable === 'object') h =  handlerEnable;

            robservable = robservable.pipe(catchError((e)=>{
                this.handlerError.handle(e, h)
                return throwError(e);
            } ))
        }
        return robservable;
        
    }
}