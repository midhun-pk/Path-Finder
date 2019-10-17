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

  getNeighbors(currentNode: Node, nodes: { [id: string]: Node }, gridArray: Node[][]): string[] {
    const neighbors: string[] = [];
    const coordinates = currentNode.id.split('-');
    const row = parseInt(coordinates[0], 10);
    const col = parseInt(coordinates[1], 10);
    let neighbor: string;
    if (gridArray[row - 1]) {
      neighbor = `${row - 1}-${col}`;
      if (nodes[neighbor].status !== 'wall') {
        neighbors.push(neighbor);
      }
    }
    if (gridArray[row][col + 1]) {
      neighbor = `${row}-${col + 1}`;
      if (nodes[neighbor].status !== 'wall') {
        neighbors.push(neighbor);
      }
    }
    if (gridArray[row + 1]) {
      neighbor = `${row + 1}-${col}`;
      if (nodes[neighbor].status !== 'wall') {
        neighbors.push(neighbor);
      }
    }
    if (gridArray[row][col - 1]) {
      neighbor = `${row}-${col - 1}`;
      if (nodes[neighbor].status !== 'wall') {
        neighbors.push(neighbor);
      }
    }
    return neighbors;
  }
}
