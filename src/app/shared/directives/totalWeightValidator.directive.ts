import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ConfiguredSculpture } from '../models/configured-sculpture';
import { Material, materialWeightMultipliers } from '../models/material';

export const totalWeightValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const array = control.value as ConfiguredSculpture[];

  let totalWeight = 0;
  for (let sculpture of array) {
    const weightMultiplier = materialWeightMultipliers[sculpture.material];
    totalWeight += sculpture.sculpture.baseWeight * weightMultiplier;
  }

  if (totalWeight <= 100) {
    return null;
  }

  return { invalidWeight: true };
};



