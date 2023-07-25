import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContainerComponent } from './edit-container.component';
import { MatCardModule } from '@angular/material/card';

describe('EditContainerComponent', () => {
  let component: EditContainerComponent;
  let fixture: ComponentFixture<EditContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContainerComponent],
      imports: [MatCardModule],
    });
    fixture = TestBed.createComponent(EditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
