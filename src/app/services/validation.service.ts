import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor() {}

  getValidatorErrorMessage(validatorName: string): string {
    const config: { [key: string]: string } = {
      notEqualPasswords: "Passwords don't match",
    };

    return config[validatorName];
  }

  passwordsValidator(password1: string, password2: string) {
    return (formGroup: FormGroup) => {
      const password1Control = formGroup.get(password1);
      const password2Control = formGroup.get(password2);

      if (password1Control?.value === password2Control?.value) {
        password2Control?.setErrors(null);
      } else {
        password2Control?.setErrors({
          notEquals: true,
        });
      }
    };
  }
}
