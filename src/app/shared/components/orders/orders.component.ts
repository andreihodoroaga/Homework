import { Component, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {
  orders$ = this.orderService.orders$;
  deleteOrderError = '';

  constructor(private orderService: OrderService, private ngZone: NgZone, private router: Router) {}

  deleteOrder(order: Order) {
    this.orderService.deleteOrder(order).then().catch(error => console.log(error));
  }

  handleNavigation() {
    this.router.navigate(["orders/add"])
  }
}
