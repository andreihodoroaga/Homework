import { Injectable, NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private ipcRenderer: IpcRenderer | undefined;

  constructor(private readonly ngZone: NgZone) {
    if (window.require) {
      try {
        this.ipcRenderer = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    }
  }

  getData(signal: string) {
    return new Observable((subscriber) => {
      this.ipcRenderer?.invoke(signal).then((data) => {
        this.ngZone.run(() => {
          subscriber.next(JSON.parse(data));
          subscriber.complete();
        });
      });
    });
  }

  sendData(signal: string, data: any) {
    this.ipcRenderer?.invoke(signal, data);
  }

  deleteData(signal: string, data: any) {
    this.ipcRenderer?.invoke(signal, data);
  }
}
