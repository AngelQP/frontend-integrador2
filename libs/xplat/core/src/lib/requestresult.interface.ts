import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';


export interface RequestResultWithData<T> {
    
    isSuccess: boolean,
    data: T
    brokenRules?:[
        {
            ruleName: string,
            descripcion: string,
            severity: number
        }
    ]
}

export interface RequestResult {
    
    isSuccess: boolean,
    brokenRules?:[
        {
            ruleName: string,
            description: string,
            severity: number
        }
    ]
}

export function isRequestResult(value: any): boolean{
    const result: RequestResult  = value;
    return true;
}

export function isRequestResultWithData<T>(value: any): boolean{
    const result: RequestResultWithData<T>  = value;
    return true;
}
export function handlerRequestResultResolve(value:any, fnSuccess?:()=>void, fnNotSuccess?:(message:string)=>void){
    if (value && isRequestResult(value)){
        
        const result: RequestResult  = value;
        if (result.isSuccess===true && fnSuccess){
            fnSuccess();
        }else if (result.isSuccess===false && fnNotSuccess){
            let messege:string = "";
            if (result.brokenRules && result.brokenRules.length>0){
                messege = result.brokenRules[0].description
            }
            fnNotSuccess(messege);
        }    
    }
}
export function handlerConflictBusiness(e: any, fnSuccess?:()=>void, fnNotSuccess?:(message:string)=>void):any{
    if(e.status === 409){
        handlerRequestResultResolve(e.error, fnSuccess, fnNotSuccess);
    }
    return e;
}

export function handlerRequestResultWithDataResolve<T>(value:any, fnSuccess?:(data: T)=>void, fnNotSuccess?:(message:string)=>void){
    if (value && isRequestResultWithData(value)){
        
        const result: RequestResultWithData<T>  = value;
        if (result.isSuccess===true && fnSuccess){
            fnSuccess(result.data);
        }else if (result.isSuccess===false && fnNotSuccess){
            let messege:string = "";
            if (result.brokenRules && result.brokenRules.length>0){
                messege = result.brokenRules[0].descripcion
            }
            fnNotSuccess(messege);
        }    
    }
}
