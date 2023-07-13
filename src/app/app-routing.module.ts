import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './shared/components/orders/orders.component';
import { SculpturesComponent } from './shared/components/sculptures/sculptures.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { AddOrderComponent } from './shared/components/orders/add-order/add-order.component';
import { EditOrderComponent } from './shared/components/orders/edit-order/edit-order.component';
import { AddSculptureComponent } from './shared/components/sculptures/add-sculpture/add-sculpture.component';
import { EditSculptureComponent } from './shared/components/sculptures/edit-sculpture/edit-sculpture.component';
import { SculpturesResolver } from './shared/resolvers/sculptures.resolver';
import { OrdersResolver } from './shared/resolvers/orders.resolver';

const routes: Routes = [
  {
    path: 'orders',
    component: OrdersComponent,
    resolve: { orders: OrdersResolver },
  },
  { path: 'orders/add', component: AddOrderComponent },
  { path: 'orders/:id', component: EditOrderComponent, resolve: { orders: OrdersResolver } },
  {
    path: 'sculptures',
    component: SculpturesComponent,
    resolve: { sculptures: SculpturesResolver },
  },
  { path: 'sculptures/add', component: AddSculptureComponent },
  { path: 'sculptures/:id', component: EditSculptureComponent },
  { path: '', redirectTo: '/orders', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
