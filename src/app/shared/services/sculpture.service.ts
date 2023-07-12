import { Injectable } from '@angular/core';
import { IpcRenderer } from 'electron';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sculpture } from '../models/sculpture';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SculptureService {
  private sculptures$ = new BehaviorSubject<Sculpture[]>([]);
  sculptureList$ = this.sculptures$.asObservable();

  constructor(private readonly dataService: DataService) {}

  getSculptures() {
    this.dataService.sendSignal('get-sculptures');
    this.dataService.getData('sculptures-data').subscribe(data => {
      this.sculptures$.next(data as Sculpture[]);
    });
  }
}
