import { TestBed } from '@angular/core/testing';

import { MazeGenerationAlgorithmService } from './maze-generation-algorithm.service';

describe('MazeGenerationAlgorithmService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MazeGenerationAlgorithmService = TestBed.get(MazeGenerationAlgorithmService);
    expect(service).toBeTruthy();
  });
});
