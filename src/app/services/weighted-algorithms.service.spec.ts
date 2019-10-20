import { TestBed } from '@angular/core/testing';

import { WeightedAlgorithmsService } from './weighted-algorithms.service';

describe('WeightedAlgorithmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeightedAlgorithmsService = TestBed.get(WeightedAlgorithmsService);
    expect(service).toBeTruthy();
  });
});
