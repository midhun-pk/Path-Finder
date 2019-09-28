import { TestBed } from '@angular/core/testing';

import { UnweightedAlgorithmsService } from './unweighted-algorithms.service';

describe('UnweightedAlgorithmsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnweightedAlgorithmsService = TestBed.get(UnweightedAlgorithmsService);
    expect(service).toBeTruthy();
  });
});
