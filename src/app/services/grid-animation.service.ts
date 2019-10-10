import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root'
})
export class GridAnimationService {
  grid: Grid;
  relevantClassNames = ['start', 'target', 'visitedStartNode'];

  constructor(private gridService: GridService) { }

  animateAlgorithm(grid: Grid) {
    this.grid = grid;
    this.timeout(0);
  }

  timeout(index: number) {
    setTimeout(() => {
      if (index === 0) {
        const startElement = document.getElementById(this.grid.start);
        startElement.className = 'visitedStartNode';
      } else if (index === this.grid.nodesToAnimate.length) {
        this.grid.nodesToAnimate = [];
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
      this.timeout(index + 1);
    }, 0);
  }
}
