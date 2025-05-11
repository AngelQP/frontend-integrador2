import { Injectable } from '@angular/core';

export abstract class ApiBaseService {
    constructor() { }

    private _endpoint: string = "";

    get endpoint(): string {
        return this._endpoint;
    }
    set endpoint(value: string) {
        this._endpoint = value;
    }

    buildUrl(path: string):string{
        return `${this.endpoint}${path}`
    }

    mapBold(data: any, type:string="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"): Blob{
        return new Blob([data], { type: type });
    }
}