import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SculpturesResolver } from './sculptures.resolver';
import { SculptureService } from '../services/sculpture.service';

describe('SculpturesResolver', () => {
  let resolver: SculpturesResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [SculptureService],
    });

    resolver = TestBed.inject(SculpturesResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
