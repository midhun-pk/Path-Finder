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

  getNeighbors(currentNode: Node, forbiddenNodes: string[], skipCount?: number): string[] {
    const distance = skipCount ? 1 + skipCount : 1;
    const grid = this.grid.getValue();
    const gridArray = grid.gridArray;
    const nodes = grid.nodes;
    const neighbors: string[] = [];
    const coordinates = currentNode.id.split('-');
    const row = parseInt(coordinates[0], 10);
    const col = parseInt(coordinates[1], 10);
    let neighbor: string;
    if (gridArray[row - distance]) {
      neighbor = `${row - distance}-${col}`;
      if (!forbiddenNodes.includes(nodes[neighbor].status)) {
        neighbors.push(neighbor);
      }
    }
    if (gridArray[row][col + distance]) {
      neighbor = `${row}-${col + distance}`;
      if (!forbiddenNodes.includes(nodes[neighbor].status)) {
        neighbors.push(neighbor);
      }
    }
    if (gridArray[row + distance]) {
      neighbor = `${row + distance}-${col}`;
      if (!forbiddenNodes.includes(nodes[neighbor].status)) {
        neighbors.push(neighbor);
      }
    }
    if (gridArray[row][col - distance]) {
      neighbor = `${row}-${col - distance}`;
      if (!forbiddenNodes.includes(nodes[neighbor].status)) {
        neighbors.push(neighbor);
      }
    }
    return neighbors;
  }

  getDirection(currentNodeId: string, nextNodeId: string): string {
    let coordinates = currentNodeId.split('-');
    const currentRow = parseInt(coordinates[0], 10);
    const currentCol = parseInt(coordinates[1], 10);
    coordinates = nextNodeId.split('-');
    const nextRow = parseInt(coordinates[0], 10);
    const nextCol = parseInt(coordinates[1], 10);
    let direction;
    if (currentRow - nextRow > 0) {
      direction = 'SOUTH';
    }
    if (currentRow - nextRow < 0) {
      direction = 'NORTH';
    }
    if (currentCol - nextCol > 0) {
      direction = 'EAST';
    }
    if (currentCol - nextCol < 0) {
      direction = 'WEST';
    }
    return direction;
  }
}
