import { Injectable } from '@angular/core';
import { UnweightedAlgorithmsService } from './unweighted-algorithms.service';
import { BehaviorSubject } from 'rxjs';
import { Algorithm } from '../models/algorithm.model';
import { MazeGenerationAlgorithmService } from './maze-generation-algorithm.service';
import { GridAnimationService } from './grid-animation.service';
import { GridService } from './grid.service';
import { WeightedAlgorithmsService } from './weighted-algorithms.service';

@Injectable({
  providedIn: 'root'
})
export class PathFinderService {
  algorithm = new BehaviorSubject<Algorithm | null>(null);

  constructor(
    private gridService: GridService,
    private unweightedAlgorithmsService: UnweightedAlgorithmsService,
    private weightedAlgorithmsService: WeightedAlgorithmsService,
    private mazeGenerationAlgorithmService: MazeGenerationAlgorithmService,
    private gridAnimationService: GridAnimationService
  ) { }

  setAlgorithm(option: { name: string, alias: string, value: string } | null) {
    const algorithm = new Algorithm();
    algorithm.name = option.name;
    algorithm.id = option.value;
    algorithm.alias = option.alias;
    this.algorithm.next(algorithm);
  }

  getAlgorithm() {
    return this.algorithm;
  }

  runPathFinderAlgorithm() {
    const grid = this.gridService.getGrid().getValue();
    const algorithm = this.algorithm.getValue();
    switch (algorithm.id) {
      case 'bfs':
        this.unweightedAlgorithmsService.bfs(grid);
        break;
      case 'dfs':
        this.unweightedAlgorithmsService.dfs(grid);
        break;
      case 'dijikstra':
        this.weightedAlgorithmsService.dijikstra(grid);
        break;
      default:
        break;
    }
    this.gridAnimationService.animateAlgorithm(grid);
  }

  runMazeGenerationAlgorithm(algorithm: string) {
    const grid = this.gridService.getGrid().getValue();
    this.gridAnimationService.clearAnimation(grid);
    this.gridService.clearWalls();
    switch (algorithm) {
      case 'rb':
        this.mazeGenerationAlgorithmService.recursiveBacktracking(grid);
        break;
      default:
        break;
    }
    this.gridAnimationService.animateMazeGenerationAlgorithm(grid);
  }
}
