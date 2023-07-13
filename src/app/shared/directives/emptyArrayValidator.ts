import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ConfiguredSculpture } from '../models/configured-sculpture';

export const emptyArrayValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const array = control.value as ConfiguredSculpture[];

  if (array && array.length > 0) {
    return null;
  }

  return { emptyArray: true };
};
