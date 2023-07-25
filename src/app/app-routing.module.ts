import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './shared/components/orders/orders.component';
import { SculpturesComponent } from './shared/components/sculptures/sculptures.component';
import { AddOrderComponent } from './shared/components/orders/add-order/add-order.component';
import { EditOrderComponent } from './shared/components/orders/edit-order/edit-order.component';
import { AddSculptureComponent } from './shared/components/sculptures/add-sculpture/add-sculpture.component';
import { EditSculptureComponent } from './shared/components/sculptures/edit-sculpture/edit-sculpture.component';
import { FormIncompleteGuard } from './shared/guards/form-incomplete.guard';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
  },
  {
    path: 'orders/add',
    component: AddOrderComponent,
    canDeactivate: [FormIncompleteGuard],
  },
  { path: 'orders/:id', component: EditOrderComponent },
  {
    path: 'sculptures',
    component: SculpturesComponent,
  },
  {
    path: 'sculptures/add',
    component: AddSculptureComponent,
    canDeactivate: [FormIncompleteGuard],
  },
  { path: 'sculptures/:id', component: EditSculptureComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
