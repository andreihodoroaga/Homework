import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, first, map } from 'rxjs';
import { Order } from '../models/order';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private ordersData$ = new ReplaySubject<Order[]>(1);
  orders$ = this.ordersData$.asObservable();

  constructor(private readonly dataService: DataService) {
    this.dataService.refresh$.subscribe(() => {
      this.getOrders();
    })
  }

  getOrders() {
    this.dataService.getData('get-orders').subscribe((data) => {
      this.ordersData$.next(data as Order[]);
    });
  }

  addOrder(order: Order) {
    this.ordersData$.pipe(first()).subscribe(prev => {
      this.dataService.sendData('add-order', order);
      this.ordersData$.next([...prev, order]);
    })
  }

  deleteOrder(order: Order) {
    this.ordersData$.pipe(first()).subscribe(prev => {
      this.dataService.deleteData('delete-order', order.id);
      this.ordersData$.next([
        ...prev.filter((ord) => ord.id !== order.id),
      ]);
    })
  }

  getNextOrderId(order: Order, direction: number) {
    return this.ordersData$.pipe(
      first(),
      map((orders) => {
        const index = orders.findIndex((ord) => ord.id === order.id);
        let nextIndex = index + direction;
        if (nextIndex === -1) {
          nextIndex = orders.length - 1;
        } else if (nextIndex === orders.length) {
          nextIndex = 0;
        }
        return orders[nextIndex].id;
      })
    );
  }
}
