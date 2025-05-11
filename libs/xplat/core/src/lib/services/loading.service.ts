import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export abstract class  LoadingService {

    private progress = new BehaviorSubject<boolean>(false);

    public progress$ = this.progress.asObservable();

    constructor() { }
    
    show(){
        this.progress.next(true);
    }
    hide(){
        this.progress.next(false);
    }

    protected abstract OnShow(): void;
    protected abstract OnHide(): void;
}