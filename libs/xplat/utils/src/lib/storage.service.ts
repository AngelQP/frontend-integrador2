import { Store } from './storage/base.store';
import { LocalStore } from './storage/store.local';

export class StorageService {
    private _store :  Store = new LocalStore();
    constructor(){

    }

   
    public setItem(name:string, value:any, params = {}) {
        this._store.setItem(name, value, params);
    }

    
    public getItem(name: string): any {
        return this._store.getItem(name);
    }

    
    public deleteItem(name : string) {
        this._store.deleteItem(name);
    }

    
    public clear() {
        this._store.clear();
    }

    
    public getStore() {
        return this._store;
    }
}