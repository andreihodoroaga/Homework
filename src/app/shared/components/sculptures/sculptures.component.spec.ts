import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SculpturesComponent } from './sculptures.component';
import { SculptureService } from '../../services/sculpture.service';
import { Sculpture } from '../../models/sculpture';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';

const mockedSculptures: Sculpture[] = [
  {
    "id": "1",
    "name": "Sculpture 1",
    "basePrice": 100,
    "baseWeight": 1
  },
  {
    "id": "2",
    "name": "Sculpture 2",
    "basePrice": 200,
    "baseWeight": 2.5
  }
]

describe('SculpturesComponent', () => {
  let component: SculpturesComponent;
  let fixture: ComponentFixture<SculpturesComponent>;
  let element: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [SculpturesComponent],
      providers: [
        {
          provide: SculptureService,
          useValue: {
            sculptureList$: of(mockedSculptures),
          },
        },
      ],
    });
    fixture = TestBed.createComponent(SculpturesComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the sculptures from the service', done => {
    component.sculptures$?.subscribe(sculptures => {
      expect(sculptures).toEqual(mockedSculptures);
      done();
    })
  })

  it('should display the right number of sculptures in the template', () => {
    const sculptureContainers = element.querySelectorAll('.sculpture-card');

    expect(sculptureContainers.length).toBe(mockedSculptures.length);
  })
});
