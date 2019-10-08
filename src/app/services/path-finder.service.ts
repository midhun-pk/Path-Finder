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
  algorithm: BehaviorSubject<string>;

  constructor(
    private unweightedAlgorithms: UnweightedAlgorithmsService,
    private gridAnimationService: GridAnimationService
  ) { }

  setAlgorithm(algorithm: string) {
    this.algorithm = new BehaviorSubject(algorithm);
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
    const algorithm = this.algorithm.getValue();
    let success: boolean;
    switch (algorithm) {
      case 'bfs':
        success = this.unweightedAlgorithms.bfs(this.grid);
        break;
      case 'dfs':
        success = this.unweightedAlgorithms.dfs(this.grid);
        break;
      default:
        break;
    }
  }
}
