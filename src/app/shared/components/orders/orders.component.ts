import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
  deleteOrderMessage = '';

  constructor(private orderService: OrderService, private router: Router, private cdRef: ChangeDetectorRef) { }

  async deleteOrder(order: Order) {
    if (this.deleteOrderMessage)
      return; // avoid spam of the delete button

    const message = await this.orderService.deleteOrder(order);
    this.deleteOrderMessage = message;
    this.cdRef.detectChanges();
    setTimeout(() => {
      this.deleteOrderMessage = '';
      this.cdRef.detectChanges();
    }, 2000)
  }

  handleNavigation() {
    this.router.navigate(["orders/add"])
  }
}
