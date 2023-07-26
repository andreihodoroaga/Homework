import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/shared/guards/form-incomplete.guard';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order.service';
import { AddOrderComponent } from '../add-order/add-order.component';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditOrderComponent implements CanComponentDeactivate {
  order$ = this.orderService.orders$.pipe(
    map((orders) =>
      orders.find((ord) => ord.id === this.activatedRoute.snapshot.params['id'])
    )
  );

  @ViewChild(AddOrderComponent)
  addOrderComponent!: AddOrderComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {}

  isFormIncomplete() {
    return this.addOrderComponent.isFormIncomplete();
  };

  handleNavigation(order: Order, direction: number) {
    this.orderService.getNextOrderId(order, direction).subscribe((id) => {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['orders', id]));
    });
  }
}
