import { Injectable } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class DateValidators {
    constructor() 
    {

    }
    
    dateLessThan(from: string, dateTo: Date) : {[key: string]: any}{
        return (group: FormGroup): {[key: string]: any} => {
            const fromDate = group.controls[from];
            
            if (fromDate.value && dateTo) {
              if (fromDate.value > dateTo) {
                  return {
                  dates: ''
                  };
              }
            }
            return {};
          };
    }
    dateControlsLessThan(from: string, to: string) {

        return (group: FormGroup): {[key: string]: any} => {
            
          const fromDate = group.controls[from];
          const toDate = group.controls[to];
          if (fromDate.value && toDate.value) {
            if (fromDate.value > toDate.value) {
                return {
                dates: ''
                };
            }
          }
          return {};
        };
    }
    dateControlsLessThanOptions(from: string, to: string):AbstractControlOptions {
      const options : AbstractControlOptions = {
        validators: this.dateControlsLessThanValidator(from, to)
      }
      return options;
    }
    dateControlsLessThanValidator (from: string, to: string): ValidatorFn{
      return (control: AbstractControl): ValidationErrors => {
          if ( control instanceof FormGroup){
              
            const fromDate = control.controls[from];
            const toDate = control.controls[to];
            if (fromDate.value && toDate.value) {
              if (fromDate.value > toDate.value) {
                return { dates: '' };
              }
            }  
          }
          return {};
        }
      }
      
    
}