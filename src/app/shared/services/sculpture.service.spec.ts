import { TestBed } from '@angular/core/testing';

import { SculptureService } from './sculpture.service';
import { DataService } from './data.service';
import { Sculpture } from '../models/sculpture';

const testData: Sculpture[] = [
  { id: '1', name: 'Sculpture 1', basePrice: 100, baseWeight: 200 },
  { id: '2', name: 'Sculpture 2', basePrice: 200, baseWeight: 300 },
];

const mockDataService = {
  getData: jasmine.createSpy('getData').and.returnValue({
    pipe: () => ({
      subscribe: (callback: (data: any) => void) => callback(testData),
    }),
  }),
};

describe('SculptureService', () => {
  let sculptureService: SculptureService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SculptureService,
        { provide: DataService, useValue: mockDataService },
      ],
    });
    sculptureService = TestBed.inject(SculptureService);
  });

  it('should be created', () => {
    expect(sculptureService).toBeTruthy();
  });

  it('should get data correctly from the dataService', (done) => {
    sculptureService.sculptureList$.subscribe((sculptures) => {
      expect(mockDataService.getData).toHaveBeenCalledWith('get-sculptures');
      expect(sculptures).toEqual(testData);
      done();
    });
  });
});
