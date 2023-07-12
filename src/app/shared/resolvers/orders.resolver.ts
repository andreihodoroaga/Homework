import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrdersResolver implements Resolve<Observable<any>> {
  constructor(private orderService: OrderService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    this.orderService.getOrders();
    return this.orderService.orders$.pipe(
      first((orders) => orders && orders.length > 0),
    );
  }
}
