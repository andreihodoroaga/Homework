import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './shared/components/orders/orders.component';
import { SculpturesComponent } from './shared/components/sculptures/sculptures.component';
import { AddOrderComponent } from './shared/components/orders/add-order/add-order.component';
import { EditOrderComponent } from './shared/components/orders/edit-order/edit-order.component';
import { AddSculptureComponent } from './shared/components/sculptures/add-sculpture/add-sculpture.component';
import { EditSculptureComponent } from './shared/components/sculptures/edit-sculpture/edit-sculpture.component';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    SculpturesComponent,
    AddOrderComponent,
    EditOrderComponent,
    AddSculptureComponent,
    EditSculptureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
