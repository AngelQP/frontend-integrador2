import { AbstractControl, ValidatorFn } from '@angular/forms';

export function matchPasswords(passwordKey: string, confirmPasswordKey: string): ValidatorFn {
  return (group: AbstractControl): { [key: string]: boolean } | null => {
    const password = group.get(passwordKey)?.value;
    const confirmPassword = group.get(confirmPasswordKey)?.value;
    return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
  };
}
