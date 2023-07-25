import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {
  orders$ = this.orderService.orders$;
  deleteOrderMessage = '';

  constructor(private orderService: OrderService, private router: Router, private cdRef: ChangeDetectorRef, private dialog: MatDialog) { }

  async handleDeleteOrder(order: Order) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      title: 'Confirm action',
      message: 'Are you sure you want to delete this order?'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        await this.deleteOrder(order);
      }
    })
  }

  async deleteOrder(order: Order) {
    if (this.deleteOrderMessage)
      return; // avoid spam of the delete button

    const message = await this.orderService.processOrder(order, 'delete');
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
