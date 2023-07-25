import { TestBed } from '@angular/core/testing';
import { FormIncompleteGuard } from './form-incomplete.guard';
import { MatDialog } from '@angular/material/dialog';

describe('formIncompleteGuard', () => {
  let formIncompleteGuard: FormIncompleteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormIncompleteGuard,
        {
          provide: MatDialog,
          useValue: {},
        },
      ],
    });
    formIncompleteGuard = TestBed.inject(FormIncompleteGuard);
  });

  it('should be created', () => {
    expect(formIncompleteGuard).toBeTruthy();
  });
});
