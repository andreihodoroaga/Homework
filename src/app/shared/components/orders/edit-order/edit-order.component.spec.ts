import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditOrderComponent } from './edit-order.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { OrderService } from 'src/app/shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/shared/models/order';
import { Material } from 'src/app/shared/models/material';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

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

describe('EditOrderComponent', () => {
  let component: EditOrderComponent;
  let fixture: ComponentFixture<EditOrderComponent>;
  let mockOrderService: jasmine.SpyObj<OrderService>;
  let router: Router;
  let mockActivatedRoute: jasmine.SpyObj<ActivatedRoute>;

  beforeEach(() => {
    mockOrderService = jasmine.createSpyObj('OrderService', ['getNextOrderId'], {
      orders$: of(mockedOrders),
    });
    mockActivatedRoute = jasmine.createSpyObj('ActivatedRoute', [], {
      snapshot: { params: { id: mockedOrders[0].id } },
    });

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([{path: 'orders/:id', component: EditOrderComponent}]), MatCardModule, MatListModule],
      declarations: [EditOrderComponent],
      providers: [
        { provide: OrderService, useValue: mockOrderService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
      ],
    });
    fixture = TestBed.createComponent(EditOrderComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the order properly', () => {
    spyOn(component, 'getOrder');

    component.ngOnInit();

    expect(component.getOrder).toHaveBeenCalled();
    expect(component.order).toEqual(mockedOrders[0]);
  });

  it('should navigate to the previous order', fakeAsync(() => {
    spyOn(router, 'navigate').and.callThrough();
    spyOn(router, 'navigateByUrl').and.callThrough();
    const prevOrderBtn = fixture.debugElement.query(By.css('.prev-order-btn')).nativeElement;
    mockOrderService.getNextOrderId.and.returnValue(of(mockedOrders[1].id));

    prevOrderBtn.click();

    expect(router.navigateByUrl).toHaveBeenCalledWith('/', { skipLocationChange: true });
    tick(1000);
    expect(router.navigate).toHaveBeenCalledWith(['orders', mockedOrders[1].id]);
  }))
});
