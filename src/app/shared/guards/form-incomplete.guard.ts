import { Injectable } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export interface CanFormComponentDeactivate {
  isFormIncomplete: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FormIncompleteGuard {
  constructor(private dialog: MatDialog) { }

  canDeactivate: CanDeactivateFn<CanFormComponentDeactivate> = (component: CanFormComponentDeactivate) => {
    if (component.isFormIncomplete()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.data = {
        title: 'Confirm action',
        message: 'You have unsaved changes. Are you sure you want to leave?'
      };

      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

      return dialogRef.afterClosed();
    }

    return true;
  };
}
