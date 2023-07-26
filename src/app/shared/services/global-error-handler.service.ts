import { ErrorHandler, Injectable } from '@angular/core';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService extends ErrorHandler {
  constructor(private readonly snackBarService: SnackbarService) {
    super();
  }

  override handleError(error: any) {
    if (error.message && error.message.includes('Uncaught (in promise)')) {
      this.snackBarService.showSnackBar(error.rejection.message, 'X');
    }
  }
}
