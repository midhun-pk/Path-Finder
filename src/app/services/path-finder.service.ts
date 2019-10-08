import { Injectable } from '@angular/core';
import { UnweightedAlgorithmsService } from './unweighted-algorithms.service';
import { Grid } from '../models/grid.model';
import { GridAnimationService } from './grid-animation.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathFinderService {
  grid: Grid;
  algorithm = new BehaviorSubject<{ name: string, value: string } | null>(null);

  constructor(
    private unweightedAlgorithms: UnweightedAlgorithmsService,
    private gridAnimationService: GridAnimationService
  ) { }

  setAlgorithm(algorithm: { name: string, value: string } | null) {
    this.algorithm.next(algorithm);
  }

  getAlgorithm() {
    return this.algorithm;
  }

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
    let success: boolean;
    const algorithm = this.algorithm.getValue();
    switch (algorithm.value) {
      case 'bfs':
        success = this.unweightedAlgorithms.bfs(this.grid);
        break;
      case 'dfs':
        success = this.unweightedAlgorithms.dfs(this.grid);
        break;
      default:
        break;
    }
    return success;
  }
}
