import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfiguredSculpture } from 'src/app/shared/models/configured-sculpture';
import { Order } from 'src/app/shared/models/order';
import { configuredSculpturesValidator } from 'src/app/shared/directives/configuredSculpturesValidator.directive';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/services/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderComponent {
  private _configuredSculptures: ConfiguredSculpture[] = [];

  orderForm = new FormGroup({
    id: new FormControl('', Validators.required),
    buyerName: new FormControl('', Validators.required),
    buyerDeliveryAddress: new FormControl('', Validators.required),
    configuredSculpture: new FormControl(null, Validators.required),
    configuredSculptures: new FormControl(this._configuredSculptures, [
      configuredSculpturesValidator,
    ]),
  });

  constructor(
    private readonly router: Router,
    private readonly orderService: OrderService
  ) {}

  public get configuredSculptures(): ConfiguredSculpture[] {
    return this._configuredSculptures;
  }

  addConfiguredSculpture(configuredSculpture: ConfiguredSculpture) {
    this._configuredSculptures.push(configuredSculpture);
    // update the value in the form control as well
    this.orderForm
      .get('configuredSculptures')
      ?.setValue(this._configuredSculptures);
  }

  removeConfiguredSculpture(configuredSculpture: ConfiguredSculpture) {
    this._configuredSculptures = this._configuredSculptures.filter(
      (sculpture) => sculpture !== configuredSculpture
    );
    // update the value in the form control as well
    this.orderForm
      .get('configuredSculptures')
      ?.setValue(this._configuredSculptures);
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

      this.orderService.addOrder(order);
    }

    this.router.navigate(['orders']);
  }
}
