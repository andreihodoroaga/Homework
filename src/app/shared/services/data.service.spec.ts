import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { of } from 'rxjs';

const expectedData = JSON.stringify([
  {
    id: 'sadf',
    buyerName: 'da',
    buyerDeliveryAddress: 'sda',
    configuredSculptures: [
      {
        sculpture: {
          id: 1,
          name: 'Sculpture 1',
          basePrice: 100,
          baseWeight: 1,
        },
        material: 'Wood',
      },
    ],
  },
]);

describe('DataService', () => {
  let dataService: DataService;
  let mockIpcRenderer = jasmine.createSpyObj('IpcRenderer', ['invoke']);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    dataService = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  // it('should return an observable with the data', done => {
  //   mockIpcRenderer.invoke('get-mocked-data').and.returnValue(of(expectedData));
  //   dataService.getData('get-mocked-data').subscribe(data => {
  //     expect(data).toEqual(JSON.parse(expectedData));
  //     done();
  //   })
  // });
});
