import { Injectable } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';


@Injectable()
export class RequiredValidators {
    constructor() 
    {

    }
    public anyFieldsRequiredValidate(fields:string[], nameError:string): ValidatorFn{
      return (control: AbstractControl): ValidationErrors=>{
        
        if ( control instanceof FormGroup){
          if (!fields.find(f=> control.controls[f]?.value)){
            const result:any = { }
            result[nameError] ='' 
            return result;
          }
        }
        return {}
      }
      
    }
    public anyFieldsRequired(fields:string[], nameError:string):AbstractControlOptions{
      const options : AbstractControlOptions = {
        validators:this.anyFieldsRequiredValidate(fields, nameError)
      }
      return options;
    }

    requiredOptional(controlNames:string[]) {

      return (group: FormGroup): {[key: string]: any} => {
          
        const values =  controlNames.filter(x=> !!group.controls[x].value )
        if (values.length==0) {
              return {
              emptyGroupControls: ''
              };
        }
        return {};
      };
    }
      
    
}