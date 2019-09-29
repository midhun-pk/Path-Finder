import { TestBed } from '@angular/core/testing';

import { GridAnimationsService } from './grid-animations.service';

describe('GridAnimationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridAnimationsService = TestBed.get(GridAnimationsService);
    expect(service).toBeTruthy();
  });
});
