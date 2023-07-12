import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConfiguredSculpture } from 'src/app/shared/models/configured-sculpture';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent {
  orderForm = new FormGroup({
    id: new FormControl(''),
    buyerName: new FormControl(''),
    buyerDeliveryAddress: new FormControl(''),
    configuredSculptures: new FormControl<ConfiguredSculpture[]>([]),
  })
}
