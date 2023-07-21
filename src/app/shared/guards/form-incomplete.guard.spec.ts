import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { formIncompleteGuard } from './form-incomplete.guard';

describe('formIncompleteGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => formIncompleteGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
