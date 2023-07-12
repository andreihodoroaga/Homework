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
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfiguredSculptureFormComponent } from './shared/components/orders/add-order/configured-sculpture-form/configured-sculpture-form.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    SculpturesComponent,
    AddOrderComponent,
    EditOrderComponent,
    AddSculptureComponent,
    EditSculptureComponent,
    PageNotFoundComponent,
    NavbarComponent,
    ConfiguredSculptureFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
