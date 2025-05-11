import { Injectable } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";

@Injectable()
export class PeDocumentsValidator {



    isTaxId(valor: any) {
        valor = (valor || "").trim()
        if (!isNaN(valor)) {
            if (valor.length == 8) {
                let suma = 0
                for (let i = 0; i < valor.length - 1; i++) {
                    const digito = valor.charAt(i);
                    if (i == 0) suma += (digito * 2)
                    else suma += (digito * (valor.length - i))
                }
                let resto = suma % 11;
                if (resto == 1) resto = 11;
                if (resto + (valor.charAt(valor.length - 1)) == 11) {
                    return true
                }
            } else if (valor.length == 11) {
                let suma = 0
                let x = 6
                for (let i = 0; i < valor.length - 1; i++) {
                    if (i == 4) x = 8
                    let digito = valor.charAt(i);
                    x--
                    if (i == 0) suma += (digito * x)
                    else suma += (digito * x)
                }
                let resto = suma % 11;
                resto = 11 - resto

                if (resto >= 10) resto = resto - 10;
                if (resto == valor.charAt(valor.length - 1)) {
                    return true
                }
            }
        }

        return false
    }

    documentValid(isDocumentType: (value: string) => any) {
        return (control: AbstractControl) => {

            const number = (control.value || "").trim();
            if (number != "") {
                if (isDocumentType('DNI')) {
                    if (isNaN(number) || number.length !== 8)
                        return { invalidDocument: true }
                }

                else if (isDocumentType('RUC')) {
                    if (isNaN(number) || !this.isTaxId(number) || number.length !== 11)
                        return { invalidDocument: true }
                }

                else if (isDocumentType('CE')) {
                    if (number.length > 20)
                        return { invalidDocument: true }
                }
            }
            return null;
        }
    }

}