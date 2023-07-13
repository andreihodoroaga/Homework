// validators.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const notEmptyArray: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const array = control.value as any[];

  if (array && array.length > 0) {
    return null;
  }

  return { emptyArray: true };
};
