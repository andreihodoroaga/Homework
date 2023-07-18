import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderComponent } from './add-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ConfiguredSculptureFormComponent } from './configured-sculpture-form/configured-sculpture-form.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddOrderComponent', () => {
  let component: AddOrderComponent;
  let fixture: ComponentFixture<AddOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule],
      declarations: [AddOrderComponent, ConfiguredSculptureFormComponent]
    });
    fixture = TestBed.createComponent(AddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
