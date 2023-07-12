import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private ipcRenderer: IpcRenderer | undefined;

  constructor() {
    if (window.require) {
      try {
        this.ipcRenderer = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    }
  }

  sendSignal(signal: string) {
    this.ipcRenderer?.send(signal);
  }

  getData(signal: string) {
    return new Observable(subscriber => {
      this.ipcRenderer?.once(signal, (event, data) => {
        subscriber.next(JSON.parse(data));
        subscriber.complete();
      });
    })
  }
}
