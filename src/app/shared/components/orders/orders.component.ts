import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {
  orders$ = this.orderService.orders$;

  constructor(private orderService: OrderService) {}

  deleteOrder(order: Order) {
    this.orderService.deleteOrder(order);
  }
}
