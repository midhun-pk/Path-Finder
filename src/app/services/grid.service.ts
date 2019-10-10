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
      const nodeElement = document.getElementById(id);
      if (node.status === 'wall') {
        node.status = 'normal';
        nodeElement.className = 'normal';
      }
    });
  }
}
