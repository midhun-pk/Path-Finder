import { Injectable } from '@angular/core';
import { UnweightedAlgorithmsService } from './unweighted-algorithms.service';
import { Grid } from '../models/grid.model';
import { GridAnimationService } from './grid-animation.service';

@Injectable({
  providedIn: 'root'
})
export class PathFinderService {
  grid: Grid;

  constructor(
    private unweightedAlgorithms: UnweightedAlgorithmsService,
    private gridAnimationService: GridAnimationService
  ) { }

  setGrid(grid: Grid) {
    this.grid = grid;
    this.gridAnimationService.grid = grid;
  }

  clearWalls() {
    Object.keys(this.grid.nodes).forEach(id => {
      const node = this.grid.nodes[id];
      const nodeElement = document.getElementById(id);
      if (node.status === 'wall') {
        node.status = 'normal';
        nodeElement.className = 'normal';
      }
    });
  }

  runAlgorithm() {
    const success = this.unweightedAlgorithms.bfs(this.grid);
  }
}
