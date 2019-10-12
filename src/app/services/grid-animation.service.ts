import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridAnimationService {
  grid: Grid;
  relevantClassNames = ['start', 'target', 'visitedStartNode'];
  animatedNodeIds: string[] = [];
  isAnimating = new BehaviorSubject<boolean>(false);

  constructor() { }

  isCurrentlyAnimating(): BehaviorSubject<boolean> {
    return this.isAnimating;
  }

  animateAlgorithm(grid: Grid) {
    this.isAnimating.next(true);
    this.grid = grid;
    this.timeout(0);
  }

  timeout(index: number) {
    setTimeout(() => {
      if (index === 0) {
        const startNode = this.grid.nodes[this.grid.start];
        startNode.element.className = 'visitedStartNode';
      } else if (index === this.grid.nodesToAnimate.length) {
        const previousNode = this.grid.nodesToAnimate[index - 1];
        if (previousNode.status === 'target') {
          previousNode.element.className = 'visitedTargetNode';
        } else {
          previousNode.element.className = 'visited';
        }
        this.grid.nodesToAnimate = [];
        this.isAnimating.next(false);
        return;
      } else {
        const currentNode = this.grid.nodesToAnimate[index];
        if (!this.relevantClassNames.includes(currentNode.element.className)) {
          currentNode.element.className = 'current';
        }
        const previousNode = this.grid.nodesToAnimate[index - 1];
        if (!this.relevantClassNames.includes(previousNode.element.className)) {
          previousNode.element.className = 'visited';
        }
      }
      const animatedNodeId = this.grid.nodesToAnimate[index].id;
      if (!this.animatedNodeIds.includes(animatedNodeId)) {
        this.animatedNodeIds.push(animatedNodeId);
      }
      this.timeout(index + 1);
    }, 0);
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
