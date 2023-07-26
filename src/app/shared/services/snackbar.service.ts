import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar, private readonly ngZone: NgZone) {}

  showSnackBar(message: string, action: string, type = 'error') {
    this.ngZone.run(() => {
      this.snackBar.open(message, action, { panelClass: type });
    })
  }
}
