import { Injectable, OnDestroy } from '@angular/core';
import { IpcRenderer } from 'electron';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { Sculpture } from '../models/sculpture';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class SculptureService implements OnDestroy {
  private sculptures$ = new BehaviorSubject<Sculpture[]>([]);
  sculptureList$ = this.sculptures$.asObservable();
  private destroyed$ = new Subject<void>();

  constructor(private readonly dataService: DataService) {
    this.fetchSculptures();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  fetchSculptures() {
    this.dataService.getData('get-sculptures').pipe(takeUntil(this.destroyed$)).subscribe(data => {
      this.sculptures$.next(data as Sculpture[]);
    });
  }

  addSculpture(sculpture: Sculpture) {
    this.dataService.sendSignal('add-sculpture', sculpture);
    this.fetchSculptures();
  }
}
