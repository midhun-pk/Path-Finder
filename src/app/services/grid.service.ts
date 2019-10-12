import { Injectable, ElementRef } from '@angular/core';
import { Grid } from '../models/grid.model';
import { BehaviorSubject } from 'rxjs';
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  grid = new BehaviorSubject<Grid | null>(null);
  gridElement: ElementRef;

  constructor() { }

  getGrid() {
    return this.grid;
  }

  setGrid(grid: Grid) {
    this.grid.next(grid);
  }

  setGridElement(gridElement: ElementRef) {
    this.gridElement = gridElement;
  }

  clearWalls() {
    const grid = this.grid.getValue();
    Object.keys(grid.nodes).forEach(id => {
      const node = grid.nodes[id];
      if (node.status === 'wall') {
        node.status = 'normal';
        node.element.className = 'normal';
      }
    });
  }

  reset() {
    const grid = this.grid.getValue();
    grid.gridArray.forEach((nodes, i) => {
      nodes.forEach((node, j) => {
        let status = 'normal';
        if (i === Math.floor(grid.rows / 2) && j === Math.floor(grid.columns / 4)) {
          grid.start = node.id;
          status = 'start';
        } else if (i === Math.floor(grid.rows / 2) && j === Math.floor(3 * grid.columns / 4)) {
          grid.target = node.id;
          status = 'target';
        }
        node.element.className = status;
        node.status = status;
        node.visited = false;
        node.previousNode = null;
      });
    });
  }
}
