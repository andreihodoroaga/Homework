import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSculptureComponent } from './add-sculpture.component';

describe('AddSculptureComponent', () => {
  let component: AddSculptureComponent;
  let fixture: ComponentFixture<AddSculptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSculptureComponent]
    });
    fixture = TestBed.createComponent(AddSculptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
