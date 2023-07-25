import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponent } from './orders.component';
import { OrderService } from '../../services/order.service';
import { of } from 'rxjs';
import { Order } from '../../models/order';
import { Material } from '../../models/material';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

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

describe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let dialogRefSpyObj = jasmine.createSpyObj({ afterClosed : of(true), close: null });
  let router: Router;

  beforeEach(() => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['processOrder'], {'orders$': of(mockedOrders)});
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatDialogModule,
        RouterTestingModule.withRoutes([])
      ],
      declarations: [OrdersComponent],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: MatDialog, useValue: mockDialog }
      ],
    });
    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the orders$ variable', (done) => {
    component.orders$.subscribe((orders) => {
      expect(orders).toEqual(mockedOrders);
      done();
    });
  });

  it('should call the delete order methods when the delete button is clicked', () => {
    spyOn(component, 'handleDeleteOrder').and.callThrough();
    mockDialog.open.and.returnValue(dialogRefSpyObj);
    spyOn(component, 'deleteOrder').and.callThrough();
    const deleteOrderBtn = fixture.debugElement.query(By.css('.delete-order-btn')).nativeElement;

    deleteOrderBtn.click();

    expect(component.handleDeleteOrder).toHaveBeenCalled();
    expect(component.deleteOrder).toHaveBeenCalled();
    expect(mockOrderService.processOrder).toHaveBeenCalled();
  });

  it('should set the deleteOrderMessage when an error occurs', async () => {
    mockOrderService.processOrder.and.returnValue(Promise.resolve('Error deleting the order'));
    await component.deleteOrder(mockedOrders[0]);  // the parameter chosen here does not have any effect
    expect(component.deleteOrderMessage).toContain('Error');
  });

  it('should navigate to orders/add when the add order button is clicked', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const addOrderBtn = fixture.debugElement.query(By.css('.add-order-btn')).nativeElement;

    addOrderBtn.click();

    expect(navigateSpy).toHaveBeenCalledWith(['orders/add']);
  });
});
