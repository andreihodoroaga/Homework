import { Component, ChangeDetectionStrategy } from '@angular/core';
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

  constructor(private orderService: OrderService, private router: Router) {}

  async deleteOrder(order: Order) {
    try {
      await this.orderService.deleteOrder(order);
    } catch (error) {
      this.deleteOrderError = error as string;
    }
  }


  handleNavigation() {
    this.router.navigate(["orders/add"])
  }
}
