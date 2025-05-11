import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ServerErrorAction{
    close: (data:ServerError)=>void
}
export interface ServerError{
    body: any,
    handlerMessage:{ message:string, icon?:string },
    action?: ServerErrorAction
}

@Injectable()
export class HandlerErrorService {
    constructor() { }
    statusNotHandler: any[]=[409]
    handlers: any = {
        "500": {
            message:"Estamos presentado algunos problemas, por favor vuelva a intentarlo en unos minutos.",
        },
        "415,404":{
            message:"Estamos presentado algunos problemas.",
        },
        '0':{
            message:"Sin conexión a internet.",
            icon: "pi-wifi"
        },
        "default":{
            message:"Ha ocurrido un error en el lado del servidor, por favor vuelva a intentarlo en unos minutos."
        }
    }

    private handler = new BehaviorSubject<ServerError|null>(null);

    public handler$ = this.handler.asObservable();

    private resolverHandler(e: any)
    {
        if (this.statusNotHandler.find(x=> x == e.status)){
            return null;
        }
        const value = this.handlers[e.status];
        if (!value)
        {
            for (const key in this.handlers) {
                const status = key.split(',')
                for (let index = 0; index < status.length; index++) {
                    if(status[index] == e.status)
                        return this.handlers[key];
                }
            }
            return this.handlers.default
        }
        return value;
    }
    public handle(value: any, handlerAction?: ServerErrorAction): any{
        const resultHandler = this.resolverHandler(value)
        if (resultHandler) this.handler.next({body: value, handlerMessage: resultHandler, action:handlerAction});
        return value;
    }
    
}