import {
  Component,
  ChangeDetectionStrategy,
} from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrdersComponent {
  orders$ = this.orderService.orders$;

  constructor(
    private orderService: OrderService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  deleteOrder(order: Order) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: 'Confirm action',
      message: 'Are you sure you want to delete this order?',
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.orderService.processOrder(order, 'delete');
      }
    });
  }

  handleNavigation() {
    this.router.navigate(['orders/add']);
  }
}
