import { TestBed } from '@angular/core/testing';

import { OrderService } from './order.service';
import { Order } from '../models/order';
import { Material } from '../models/material';
import { of } from 'rxjs';
import { DataService } from './data.service';

const mockedOrders: Order[] = [
  {
    id: 'sadf',
    buyerName: 'da',
    buyerDeliveryAddress: 'sda',
    configuredSculptures: [
      {
        sculpture: {
          id: '1',
          name: 'Sculpture 1',
          basePrice: 100,
          baseWeight: 1,
        },
        material: Material.Wood,
      },
    ],
  },
  {
    id: 'ada',
    buyerName: 'ada',
    buyerDeliveryAddress: 'dasd',
    configuredSculptures: [
      {
        sculpture: {
          id: '1',
          name: 'Sculpture 1',
          basePrice: 100,
          baseWeight: 1,
        },
        material: Material.Bronze,
      },
    ],
  },
];

describe('OrderService', () => {
  let orderService: OrderService;
  let mockDataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    mockDataService = jasmine.createSpyObj('DataService', [
      'getData',
      'refresh$',
      'sendSignal',
    ]);
    mockDataService.getData.and.returnValue(of(mockedOrders));
    mockDataService.refresh$ = of('');

    TestBed.configureTestingModule({
      providers: [{ provide: DataService, useValue: mockDataService }],
    });
    orderService = TestBed.inject(OrderService);
  });

  it('should be created', () => {
    expect(orderService).toBeTruthy();
  });

  it('should fetch the orders on creation', (done) => {
    orderService.orders$.subscribe((data) => {
      expect(data).toEqual(mockedOrders);
      done();
    });
  });

  it('should add a new order', async () => {
    mockDataService.sendSignal.and.returnValue(Promise.resolve());
    spyOn(orderService, 'fetchOrders').and.callThrough();

    const result = await orderService.addOrder(mockedOrders[0]);

    expect(mockDataService.sendSignal).toHaveBeenCalled();
    expect(orderService.fetchOrders).toHaveBeenCalled();
    expect(result).toEqual('Success');
  });

  it('should return a rejected promise when an order cannot be added', async () => {
    mockDataService.sendSignal.and.returnValue(Promise.reject());

    await orderService.addOrder(mockedOrders[0]).catch((reason) => {
      expect(reason).toEqual('Error adding the order');
    });
  });

  it('should delete an order', async () => {
    mockDataService.sendSignal.and.returnValue(Promise.resolve());
    spyOn(orderService, 'fetchOrders').and.callThrough();

    const result = await orderService.deleteOrder(mockedOrders[0]);

    expect(mockDataService.sendSignal).toHaveBeenCalledWith('delete-order', mockedOrders[0].id);
    expect(orderService.fetchOrders).toHaveBeenCalled();
    expect(result).toEqual('Success');
  });

  it('should get the next order\'s id', (done) => {
    const nextOrder$ = orderService.getNextOrderId(mockedOrders[0], +1);
    nextOrder$.subscribe(order => {
      expect(order).toEqual(mockedOrders[1].id);
      done();
    })
  })
});
