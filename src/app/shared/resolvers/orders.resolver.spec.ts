import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { OrdersResolver } from './orders.resolver';
import { OrderService } from '../services/order.service';

describe('OrdersResolver', () => {
  let resolver: OrdersResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [OrderService],
    });

    resolver = TestBed.inject(OrdersResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
