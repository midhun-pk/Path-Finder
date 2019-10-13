import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridAnimationService {
  relevantClassNames = ['start', 'target', 'visitedStartNode'];
  animatedNodeIds: string[] = [];
  isAnimating = new BehaviorSubject<boolean>(false);

  constructor() { }

  isCurrentlyAnimating(): BehaviorSubject<boolean> {
    return this.isAnimating;
  }

  animateAlgorithm(grid: Grid) {
    this.isAnimating.next(true);
    this.animateAlgorithmTimeout(grid, 0);
  }

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
      if (index === 0) {
        currentNode.element.className = 'shortest-path';
      } else if (index === grid.shortestPathNodesToAnimate.length) {
        this.isAnimating.next(false);
        return;
      } else {
        currentNode.element.className = 'shortest-path';
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
      node.visited = false;
      node.previousNode = null;
    }
  }
}
