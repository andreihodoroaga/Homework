import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { SculptureService } from '../services/sculpture.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SculpturesResolver implements Resolve<Observable<any>> {
  constructor(private sculptureService: SculptureService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.sculptureService.getSculptures();
    return this.sculptureService.sculptureList$.pipe(
      first((sculptures) => sculptures && sculptures.length > 0)
    );
  }
}
