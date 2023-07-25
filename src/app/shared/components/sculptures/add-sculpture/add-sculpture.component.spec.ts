import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSculptureComponent } from './add-sculpture.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddSculptureComponent', () => {
  let component: AddSculptureComponent;
  let fixture: ComponentFixture<AddSculptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSculptureComponent],
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, BrowserAnimationsModule],
    });
    fixture = TestBed.createComponent(AddSculptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
