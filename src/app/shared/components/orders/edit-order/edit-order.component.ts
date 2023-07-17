import { ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, map, takeUntil, tap } from 'rxjs';
import { Order } from 'src/app/shared/models/order';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditOrderComponent implements OnDestroy{
  order!: Order;
  private destroyed$ = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.getOrder();
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  getOrder() {
    this.orderService.orders$
      .pipe(
        takeUntil(this.destroyed$),
        map((orders) =>
          orders.find(
            (ord) => ord.id === this.activatedRoute.snapshot.params['id']
          )
        )
      )
      .subscribe((order) => {
        this.order = order!;
      });
  }

  handleNavigation(direction: number) {
    this.orderService.getNextOrderId(this.order, direction).subscribe((id) => {
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['orders', id]));
    });
  }
}
