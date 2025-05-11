import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { StorageService } from '@tramarsa/xplat/utils'

@Injectable()
export class TokenProviderService {

    KEYTOKEN: string ="auth.token"
    KEYDATA: string ="auth.data"
    KEYCLIENT: string ="auth.client"
    KEYEXPIRES_IN:string = "auth.expires_in";
    KEYDATE:string = "auth.date";
    storage: StorageService  = new StorageService();
    
    constructor() {

    }
    public isToken():boolean{
        return !!this.getToken()
    }

    public getToken():string{
        return this.storage.getItem(this.KEYTOKEN);
    }
    public getData():any{
        return this.storage.getItem(this.KEYDATA);
    }
    public getClient():any{
        return this.storage.getItem(this.KEYCLIENT);
    }
    public setToken(tokenjwt: string){
       this.storage.setItem(this.KEYTOKEN, tokenjwt);
    }
    public setData(data: any){
        this.storage.setItem(this.KEYDATA, data);
    }
    public setClient(data: any){
        this.storage.setItem(this.KEYCLIENT, data);
    }
    public setExpiresIn(expires_in:string){
        this.storage.setItem(this.KEYEXPIRES_IN, expires_in);
    }
    public getExpiresIn():string{
        var value = this.storage.getItem(this.KEYEXPIRES_IN);
        if (value)
            return value;
        else 
            return "0";
    }

    public setDate(){
        this.storage.setItem(this.KEYDATE, JSON.stringify(new Date()));
    }
    public getDate(): any{
        var value = this.storage.getItem(this.KEYDATE);
        if (value){
            const _value = value.replace(/['"]+/g, '');
            return new Date(_value)
        }
        return null;
    }

    public clearToken(){
        this.storage.deleteItem(this.KEYTOKEN);
    }

    public clearData(){
        this.storage.deleteItem(this.KEYDATA);
    }
    public clearClient(){
        this.storage.deleteItem(this.KEYCLIENT);
    }

    public clearExpiresIn(){
        this.storage.deleteItem(this.KEYEXPIRES_IN);
    }
    public clearDate(){
        this.storage.deleteItem(this.KEYDATE);
    }
    
}