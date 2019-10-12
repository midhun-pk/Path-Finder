import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { GridService } from './grid.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridAnimationService {
  grid: Grid;
  relevantClassNames = ['start', 'target', 'visitedStartNode'];
  animatedNodeIds: string[] = [];
  isAnimating = new BehaviorSubject<boolean>(false);

  constructor(private gridService: GridService) { }

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
        const startElement = document.getElementById(this.grid.start);
        startElement.className = 'visitedStartNode';
      } else if (index === this.grid.nodesToAnimate.length) {
        const previousNode = this.grid.nodesToAnimate[index - 1];
        const previousElement = document.getElementById(previousNode.id);
        if (previousNode.status === 'target') {
          previousElement.className = 'visitedTargetNode';
        } else {
          previousElement.className = 'visited';
        }
        this.grid.nodesToAnimate = [];
        this.isAnimating.next(false);
        return;
      } else {
        const currentNode = this.grid.nodesToAnimate[index];
        const currentElement = document.getElementById(currentNode.id);
        if (!this.relevantClassNames.includes(currentElement.className)) {
          currentElement.className = 'current';
        }
        const previousNode = this.grid.nodesToAnimate[index - 1];
        const previousElement = document.getElementById(previousNode.id);
        if (!this.relevantClassNames.includes(previousElement.className)) {
          previousElement.className = 'visited';
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
      const nodeElement = document.getElementById(id);
      if (node.status === 'start') {
        nodeElement.className = 'start';
      } else if (node.status === 'target') {
        nodeElement.className = 'target';
      } else if (node.visited) {
        nodeElement.className = 'normal';
        node.status = 'normal';
      }
      node.visited = false;
      node.previousNode = null;
    }
  }
}
