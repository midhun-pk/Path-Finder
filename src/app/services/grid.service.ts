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
  nodeHeight = 25;
  nodeWidth = 26;

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

  createGrid() {
    const grid = new Grid();
    const gridArray: Node[][] = [];
    grid.rows = Math.floor((this.gridElement.nativeElement as HTMLElement).offsetHeight / this.nodeHeight);
    grid.columns = Math.floor((this.gridElement.nativeElement as HTMLElement).offsetWidth / this.nodeWidth);
    for (let i = 0; i < grid.rows; i++) {
      const nodeArray: Node[] = [];
      for (let j = 0; j < grid.columns; j++) {
        const id = `${i}-${j}`;
        let status = 'normal';
        if (i === Math.floor(grid.rows / 2) && j === Math.floor(grid.columns / 4)) {
          grid.start = id;
          status = 'start';

        } else if (i === Math.floor(grid.rows / 2) && j === Math.floor(3 * grid.columns / 4)) {
          grid.target = id;
          status = 'target';
        }
        const node = new Node();
        node.id = id;
        node.status = status;
        nodeArray.push(node);
        grid.nodes[id] = node;
      }
      gridArray.push(nodeArray);
    }
    grid.gridArray = gridArray;
    this.grid.next(grid);
    return gridArray;
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
