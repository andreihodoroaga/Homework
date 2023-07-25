import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSculptureComponent } from './edit-sculpture.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('EditSculptureComponent', () => {
  let component: EditSculptureComponent;
  let fixture: ComponentFixture<EditSculptureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSculptureComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(EditSculptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
