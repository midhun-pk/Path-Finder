import { TestBed } from '@angular/core/testing';

import { MazeAnimationService } from './maze-animation.service';

describe('MazeAnimationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MazeAnimationService = TestBed.get(MazeAnimationService);
    expect(service).toBeTruthy();
  });
});
