import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContainerComponent } from './edit-container.component';

describe('EditContainerComponent', () => {
  let component: EditContainerComponent;
  let fixture: ComponentFixture<EditContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditContainerComponent]
    });
    fixture = TestBed.createComponent(EditContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
