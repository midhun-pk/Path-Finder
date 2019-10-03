import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';

@Injectable({
  providedIn: 'root'
})
export class GridAnimationService {
  grid: Grid;

  constructor() { }

  animateAlgorithm() {
    this.timeout(0);
  }

  timeout(index: number) {
    setTimeout(() => {
      if (index === 0) {
        const startElement = document.getElementById(this.grid.start);
        startElement.className = 'visitedStartNode';
      }
    }, 40);
  }
}
