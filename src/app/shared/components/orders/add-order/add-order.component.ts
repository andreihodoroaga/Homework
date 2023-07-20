import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  Input,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguredSculpture } from 'src/app/shared/models/configured-sculpture';
import { Order } from 'src/app/shared/models/order';
import { emptyArrayValidator } from 'src/app/shared/directives/emptyArrayValidator';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';
import { totalWeightValidator } from 'src/app/shared/directives/totalWeightValidator.directive';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderComponent implements OnInit, OnDestroy {
  @Input()
  existingOrder!: Order;

  private _configuredSculptures: ConfiguredSculpture[] = [];
  exceededWeightError: string | null = null;
  errorMessage: string = '';
  private destroyed$ = new Subject<void>();

  orderForm = new FormGroup({
    id: new FormControl('', Validators.required),
    buyerName: new FormControl('', Validators.required),
    buyerDeliveryAddress: new FormControl('', Validators.required),
    configuredSculpture: new FormControl(null),
    configuredSculptures: new FormControl(this._configuredSculptures, [
      emptyArrayValidator,
      totalWeightValidator,
    ]),
  });

  constructor(
    private readonly router: Router,
    private readonly orderService: OrderService
  ) {}

  ngOnInit(): void {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['existingOrder'] && changes['existingOrder'].currentValue) {
      this._configuredSculptures = this.existingOrder.configuredSculptures;
      this.orderForm.patchValue({ id: this.existingOrder.id });
      this.orderForm.patchValue({ buyerName: this.existingOrder.buyerName });
      this.orderForm.patchValue({
        buyerDeliveryAddress: this.existingOrder.buyerDeliveryAddress,
      });
      this.orderForm.patchValue({
        configuredSculptures: this.existingOrder.configuredSculptures,
      });
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  public get configuredSculptures(): ConfiguredSculpture[] {
    return this._configuredSculptures;
  }

  public get formBtnText() {
    return `${this.existingOrder ? 'Save' : 'Send'} Order`;
  }

  addConfiguredSculpture(configuredSculpture: ConfiguredSculpture) {
    this._configuredSculptures.push(configuredSculpture);
    this.orderForm
      .get('configuredSculptures')
      ?.setValue(this._configuredSculptures);
  }

  removeConfiguredSculpture(configuredSculpture: ConfiguredSculpture) {
    this._configuredSculptures = this._configuredSculptures.filter(
      (sculpture) => sculpture !== configuredSculpture
    );
    this.orderForm
      .get('configuredSculptures')
      ?.setValue(this._configuredSculptures);
  }

  async onSubmit() {
    const { id, buyerName, buyerDeliveryAddress } = this.orderForm.value;

    if (id && buyerName && buyerDeliveryAddress && this.configuredSculptures) {
      const order: Order = {
        id,
        buyerName,
        buyerDeliveryAddress,
        configuredSculptures: this.configuredSculptures,
      };

      try {
        await this.orderService.addOrder(order);
        this.router.navigate(['orders']);
      } catch (errorMessage) {
        this.errorMessage = errorMessage as string;
      }
    }
  }
}
