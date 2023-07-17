import { Injectable } from '@angular/core';
import { ReplaySubject, first, map } from 'rxjs';
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
    this.dataService.sendData('add-order', order).subscribe({
      next: () => this.getOrders(),
      error: (response) => console.log(response.error)
    });
  }

  deleteOrder(order: Order) {
    this.dataService.deleteData('delete-order', order.id).subscribe({
      next: () => this.getOrders(),
      error: (response) => console.log(response.error)
    });
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
