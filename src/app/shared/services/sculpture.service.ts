import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sculpture } from '../models/sculpture';

@Injectable({
  providedIn: 'root'
})
export class SculptureService {
  private ipcRenderer: IpcRenderer | undefined;
  private sculptures$ = new BehaviorSubject<Sculpture[]>([]);
  sculptureList$ = this.sculptures$.asObservable();

  constructor() {
    if (window.require) {
      try {
        this.ipcRenderer = window.require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    }
    this.getSculptures();
  }

  getSculptures() {
    this.ipcRenderer?.send('get-sculptures');

    this.ipcRenderer?.once('sculptures-data', (event, data) => {
      this.sculptures$.next(JSON.parse(data));
    });
  }
}
