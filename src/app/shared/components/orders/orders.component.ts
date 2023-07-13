import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent implements OnInit {
  orders$ = this.orderService.orders$;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
  }
}
