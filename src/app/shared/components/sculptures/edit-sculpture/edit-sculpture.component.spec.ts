import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSculptureComponent } from './edit-sculpture.component';

describe('EditSculptureComponent', () => {
  let component: EditSculptureComponent;
  let fixture: ComponentFixture<EditSculptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSculptureComponent]
    });
    fixture = TestBed.createComponent(EditSculptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
