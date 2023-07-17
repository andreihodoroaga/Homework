import { Injectable, NgZone } from '@angular/core';
import { IpcRenderer } from 'electron';
import { BehaviorSubject, Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private ipcRenderer: IpcRenderer | undefined;
  private refreshContent$ = new BehaviorSubject<string>('');
  refresh$ = this.refreshContent$.asObservable();

  constructor(private readonly ngZone: NgZone) {
    if (window.require) {
      try {
        this.ipcRenderer = window.require('electron').ipcRenderer;
        this.ipcRenderer.on('reload-content', () => {
          this.refreshContent$.next("refresh");
        })
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
    return from(this.ipcRenderer!.invoke(signal, data));
  }

  deleteData(signal: string, data: any) {
    return from(this.ipcRenderer!.invoke(signal, data));
  }
}
