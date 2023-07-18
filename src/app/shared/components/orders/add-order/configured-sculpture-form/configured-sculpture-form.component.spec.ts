import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguredSculptureFormComponent } from './configured-sculpture-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ConfiguredSculptureFormComponent', () => {
  let component: ConfiguredSculptureFormComponent;
  let fixture: ComponentFixture<ConfiguredSculptureFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      declarations: [ConfiguredSculptureFormComponent],
    });
    fixture = TestBed.createComponent(ConfiguredSculptureFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
