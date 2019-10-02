import { TestBed } from '@angular/core/testing';

import { GridAnimationService } from './grid-animation.service';

describe('GridAnimationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridAnimationService = TestBed.get(GridAnimationService);
    expect(service).toBeTruthy();
  });
});
