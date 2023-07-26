import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguredSculpture } from 'src/app/shared/models/configured-sculpture';
import { Order } from 'src/app/shared/models/order';
import { emptyArrayValidator } from 'src/app/shared/directives/emptyArrayValidator.directive';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { totalWeightValidator } from 'src/app/shared/directives/totalWeightValidator.directive';
import { Subject, takeUntil } from 'rxjs';
import * as uuid from 'uuid';
import { CanComponentDeactivate } from 'src/app/shared/guards/form-incomplete.guard';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderComponent
  implements OnInit, OnDestroy, CanComponentDeactivate
{
  private _existingOrder?: Order;

  public get existingOrder() {
    return this._existingOrder;
  }

  @Input()
  public set existingOrder(value: Order | undefined) {
    this._existingOrder = value;
    this.orderForm.patchValue({ ...value });
  }

  exceededWeightError: string | null = null;
  errorMessage: string = '';
  private destroyed$ = new Subject<void>();
  private formSubmitted = false;

  orderForm = new FormGroup({
    id: new FormControl(uuid.v4(), {
      validators: Validators.required,
      nonNullable: true,
    }),
    buyerName: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    buyerDeliveryAddress: new FormControl('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    configuredSculpture: new FormControl<ConfiguredSculpture | null>(null),
    configuredSculptures: new FormControl<ConfiguredSculpture[]>([], {
      validators: [emptyArrayValidator, totalWeightValidator],
      nonNullable: true,
    }),
  });

  constructor(
    private readonly router: Router,
    private readonly orderService: OrderService
  ) {}

  ngOnInit() {
    this.orderForm.valueChanges
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        if (
          this.orderForm.controls['configuredSculptures'].errors?.[
            'invalidWeight'
          ]
        ) {
          this.exceededWeightError =
            'We only ship a maximum of 100 kg of sculptures! (our courier needs to hit the gym more)';
        } else {
          this.exceededWeightError = null;
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public get configuredSculptures() {
    return this.orderForm.controls['configuredSculptures'].value;
  }

  public get formBtnText() {
    return `${this.existingOrder ? 'Save' : 'Send'} Order`;
  }

  isFormIncomplete() {
    return this.orderForm.dirty && !this.formSubmitted;
  }

  addConfiguredSculpture(configuredSculpture: ConfiguredSculpture) {
    this.orderForm.controls['configuredSculptures'].setValue([
      ...(this.configuredSculptures || []),
      configuredSculpture,
    ]);
  }

  removeConfiguredSculpture(configuredSculpture: ConfiguredSculpture) {
    const updatedConfiguredSculptures = (
      this.configuredSculptures || []
    ).filter((sculpture) => sculpture !== configuredSculpture);
    this.orderForm.controls['configuredSculptures'].setValue(
      updatedConfiguredSculptures
    );
  }

  onSubmit() {
    const { id, buyerName, buyerDeliveryAddress } = this.orderForm.value;

    if (id && buyerName && buyerDeliveryAddress && this.configuredSculptures) {
      const order: Order = {
        id,
        buyerName,
        buyerDeliveryAddress,
        configuredSculptures: this.configuredSculptures,
      };

      this.orderService.processOrder(order, 'add');
      this.formSubmitted = true;
      this.router.navigate(['orders']);
    }
  }
}
