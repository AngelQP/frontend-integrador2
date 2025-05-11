import { FormArray, FormGroup } from '@angular/forms';
// https://www.freecodecamp.org/news/angular-generic-form-validator/

// Generic validator for Reactive forms
// Implemented as a class, not a service, so it can retain state for multiple forms.
export class GenericValidator {

    // Provide the set of valid validation messages
    // Stucture:
    // controlName1: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // },
    // controlName2: {
    //     validationRuleName1: 'Validation Message.',
    //     validationRuleName2: 'Validation Message.'
    // }
    constructor(private validationMessages: { [key: string]: { [key: string]: string } }) {

    }

    // Processes each control within a FormGroup
    // And returns a set of validation messages to display
    // Structure
    // controlName1: 'Validation Message.',
    // controlName2: 'Validation Message.'
    processMessages(container: FormGroup, force: boolean = false, convertRootMessagesToProps: boolean = false, groupArrayName: string = ""): { [key: string]: string } {
        const messages: any = {};

        if (container.errors) {
            // tslint:disable-next-line: no-string-literal
            messages['root'] = '';
            Object.keys(container.errors).map(messageKey => {
                if (this.validationMessages.root && this.validationMessages.root[messageKey]) {
                    // tslint:disable-next-line: no-string-literal
                    if (convertRootMessagesToProps) {
                        messages[`${groupArrayName}${messageKey}`] = this.validationMessages.root[messageKey];
                    } else {
                        messages['root'] += this.validationMessages.root[messageKey] + '\n';
                    }
                }
                else {
                    messages[`${groupArrayName}${messageKey}`] = true;
                }
            });
        }

        for (const controlKey in container.controls) {
            if (container.controls.hasOwnProperty(controlKey)) {
                const c = container.controls[controlKey];
                // If it is a FormGroup, process its child controls.
                if (c instanceof FormGroup) {
                    const childMessages = this.processMessages(c, force);
                    Object.assign(messages, childMessages);
                }
                if (c instanceof FormArray) {
                    for (let index = 0; index < c.controls.length; index++) {
                        const element = c.controls[index];
                        if (element instanceof FormGroup) {
                            const childMessages = this.processMessages(element, force, convertRootMessagesToProps, `${controlKey}[${index}].`);
                            Object.assign(messages, childMessages);
                        }
                    }
                }
                else {
                    // Only validate if there are validation messages for the control
                    if (this.validationMessages[controlKey]) {
                        messages[controlKey] = '';
                        if ((c.dirty || c.touched || force) && c.errors) {
                            Object.keys(c.errors).map(messageKey => {
                                if (this.validationMessages[controlKey][messageKey]) {
                                    if (messages[controlKey] === '') {
                                        messages[controlKey] += this.validationMessages[controlKey][messageKey];
                                    } else {
                                        messages[controlKey] += '. ' + this.validationMessages[controlKey][messageKey];
                                    }
                                }
                            });
                        }
                    }
                    else {
                        if ((c.dirty || c.touched || force) && c.errors) {
                            messages[`${groupArrayName}${controlKey}`] = true;
                        }

                    }
                }
            }
        }
        return messages;
    }

    allValidate(form: FormGroup) {
        for (const key in form.controls) {
            const control = form.controls[key];
            if (control.updateValueAndValidity)
                control.updateValueAndValidity();
        }
    }
}
