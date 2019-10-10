import { Injectable } from '@angular/core';
import { UnweightedAlgorithmsService } from './unweighted-algorithms.service';
import { BehaviorSubject } from 'rxjs';
import { Algorithm } from '../models/algorithm.model';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root'
})
export class PathFinderService {
  algorithm = new BehaviorSubject<Algorithm | null>(null);

  constructor(
    private unweightedAlgorithms: UnweightedAlgorithmsService,
    private gridService: GridService
  ) { }

  setAlgorithm(option: { name: string, value: string } | null) {
    const algorithm = new Algorithm();
    algorithm.name = option.name;
    algorithm.id = option.value;
    this.algorithm.next(algorithm);
  }

  getAlgorithm() {
    return this.algorithm;
  }

  runAlgorithm(grid) {
    let success: boolean;
    const algorithm = this.algorithm.getValue();
    switch (algorithm.id) {
      case 'bfs':
        success = this.unweightedAlgorithms.bfs(grid);
        break;
      case 'dfs':
        success = this.unweightedAlgorithms.dfs(grid);
        break;
      default:
        break;
    }
    return success;
  }
}
