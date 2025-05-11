
import { AbstractControl } from "@angular/forms";


export  class InputFileValidators {
    constructor() { }
    
    static requiredExtension( extensions: string[] ) {
      
        return function (control: AbstractControl) {
          const file = control.value;
          if ( file ) {
            let name = file ?? "";
            let parts = name.split('.');
            let ext = parts.length>1?parts[parts.length - 1]:"";
            const extension = ext.toLowerCase();
            for (let index = 0; index < extensions.length; index++) {
                const ext = extensions[index];
                if (ext === extension.toLowerCase())
                    return null;
            }
           return { requiredExtension: true };
          }
      
          return null;
        };
      }
}