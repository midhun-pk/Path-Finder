import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { BehaviorSubject } from 'rxjs';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root'
})
export class GridAnimationService {
  relevantClassNames = ['start', 'target', 'visitedStartNode'];
  animatedNodeIds: string[] = [];
  isAnimating = new BehaviorSubject<boolean>(false);
  isPathFindingAlgorithmVisualized = new BehaviorSubject<boolean>(false);

  constructor(private gridService: GridService) { }

  isCurrentlyAnimating(): BehaviorSubject<boolean> {
    return this.isAnimating;
  }

  isPathFindingAlgorithmAnimated(): BehaviorSubject<boolean> {
    return this.isPathFindingAlgorithmVisualized;
  }

  animateAlgorithm(grid: Grid) {
    this.isAnimating.next(true);
    this.animateAlgorithmTimeout(grid, 0);
  }

  /**
   * Animate the current running algorithm
   * @param grid Grid model
   * @param index Current animating index
   */
  animateAlgorithmTimeout(grid: Grid, index: number) {
    setTimeout(() => {
      if (index === 0) {
        const startNode = grid.nodes[grid.start];
        startNode.element.className = 'visitedStartNode';
      } else if (index === grid.nodesToAnimate.length) {
        const previousNode = grid.nodesToAnimate[index - 1];
        if (previousNode.status === 'target') {
          previousNode.element.className = 'visitedTargetNode';
          this.animateShortestPath(grid);
        } else {
          previousNode.element.className = 'visited';
          this.isAnimating.next(false);
        }
        grid.nodesToAnimate = [];
        this.isPathFindingAlgorithmVisualized.next(true);
        return;
      } else {
        const currentNode = grid.nodesToAnimate[index];
        if (!this.relevantClassNames.includes(currentNode.element.className)) {
          currentNode.element.className = 'current';
        }
        const previousNode = grid.nodesToAnimate[index - 1];
        if (!this.relevantClassNames.includes(previousNode.element.className)) {
          previousNode.element.className = 'visited';
        }
      }
      const animatedNodeId = grid.nodesToAnimate[index].id;
      if (!this.animatedNodeIds.includes(animatedNodeId)) {
        this.animatedNodeIds.push(animatedNodeId);
      }
      this.animateAlgorithmTimeout(grid, index + 1);
    }, 0);
  }

  /**
   * Animate the shortest path found by the current algorithm
   * @param grid Grid model
   */
  animateShortestPath(grid: Grid) {
    grid.shortestPathNodesToAnimate = [];
    let currentNode = grid.nodesToAnimate[grid.nodesToAnimate.length - 1];
    while (currentNode.id !== grid.start) {
      grid.shortestPathNodesToAnimate.push(currentNode);
      currentNode = grid.nodes[currentNode.previousNode];
    }
    grid.shortestPathNodesToAnimate.push(currentNode);
    grid.shortestPathNodesToAnimate.reverse();
    this.animateShortestPathTimeout(grid, 0);
  }

  animateShortestPathTimeout(grid: Grid, index: number) {
    setTimeout(() => {
      const currentNode = grid.shortestPathNodesToAnimate[index];
      let className = index === 0 ? 'shortest-path-start' : 'shortest-path';
      if (index < grid.shortestPathNodesToAnimate.length - 1) {
        const nextNode = grid.shortestPathNodesToAnimate[index + 1];
        const direction = this.gridService.getDirection(currentNode.id, nextNode.id);
        className += ' ' + direction;
      }
      if (index === 0) {
        currentNode.element.className = className;
      } else if (index === grid.shortestPathNodesToAnimate.length - 1) {
        currentNode.element.className = 'shortest-path-target';
        this.isAnimating.next(false);
        return;
      } else {
        currentNode.element.className = className;
      }
      this.animateShortestPathTimeout(grid, index + 1);
    }, 40);
  }

  clearAnimation(grid: Grid) {
    while (this.animatedNodeIds.length > 0) {
      const id = this.animatedNodeIds.shift();
      const node = grid.nodes[id];
      if (node.status === 'start') {
        node.element.className = 'start';
      } else if (node.status === 'target') {
        node.element.className = 'target';
      } else if (node.visited) {
        node.element.className = 'normal';
        node.status = 'normal';
      }
      node.weight = 0;
      node.visited = false;
      node.previousNode = null;
      node.distance = Infinity;
      node.globalDistance = Infinity;
    }
    this.isPathFindingAlgorithmVisualized.next(false);
  }

  animateMazeGenerationAlgorithm(grid: Grid) {
    this.isAnimating.next(true);
    this.animateMazeTimeout(grid, 0);
  }

  animateMazeTimeout(grid: Grid, index: number) {
    setTimeout(() => {
      if (index === grid.nodesToAnimate.length) {
        this.isAnimating.next(false);
        return;
      } else {
        const node = grid.nodesToAnimate[index];
        node.status = 'wall';
        node.element.className = 'wall';
      }
      this.animateMazeTimeout(grid, index + 1);
    }, 0);
  }

}
