import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

export interface CanComponentDeactivate {
  isFormIncomplete: () => boolean;
}

@Injectable({
  providedIn: 'root',
})
export class FormIncompleteGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private dialog: MatDialog) {}

  canDeactivate(component: CanComponentDeactivate): Observable<boolean> | boolean {
    if (component.isFormIncomplete()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.data = {
        title: 'Confirm action',
        message: 'You have unsaved changes. Are you sure you want to leave?'
      };

      const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

      return dialogRef.afterClosed();
    }

    return true;
  }
}
