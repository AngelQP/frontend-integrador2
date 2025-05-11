import { Store } from "./base.store";

export class LocalStore extends Store {
  constructor() {
    super()
  }

  setItem(name: string, value: any, params = {}):void {
    window.localStorage.setItem(name, JSON.stringify(value));
  }

  getItem(name: string):any {
    const value = window.localStorage.getItem(name);
    if (value) return JSON.parse(value);
    return null;
  }

  deleteItem(name: string):void {
    window.localStorage.removeItem(name);
  }

  clear():void {
    window.localStorage.clear();
  }
}