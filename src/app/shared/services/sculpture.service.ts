import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, first, map, takeUntil } from 'rxjs';
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
    this.dataService.refresh$.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      this.fetchSculptures();
    });
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

  async addSculpture(sculpture: Sculpture) {
    const result = await this.dataService.sendSignal('add-sculpture', sculpture);
    if (result.success) {
      return '';
    }
    return `Error adding the sculpture!`;
  }


  getNextSculptureId(sculpture: Sculpture, direction: number) {
    return this.sculptures$.pipe(
      first(),
      map((sculptures) => {
        const index = sculptures.findIndex((ord) => ord.id === sculpture.id);
        let nextIndex = index + direction;
        if (nextIndex === -1) {
          nextIndex = sculptures.length - 1;
        } else if (nextIndex === sculptures.length) {
          nextIndex = 0;
        }
        return sculptures[nextIndex].id;
      })
    );
  }
}
