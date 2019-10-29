import { Injectable, ElementRef } from '@angular/core';
import { Grid } from '../models/grid.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GridService {
  grid = new BehaviorSubject<Grid | null>(null);
  gridElement: ElementRef;
  addWeight = new BehaviorSubject<boolean>(false);

  constructor() { }

  getGrid() {
    return this.grid;
  }

  setGrid(grid: Grid) {
    this.grid.next(grid);
  }

  toggleAddWeight() {
    this.addWeight.next(!this.addWeight.getValue());
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
        node.distance = Infinity;
      });
    });
  }

  getNeighbors(currentNodeId: string, forbiddenNodes?: string[], nodeSkipCount?: number, skipVisited?: boolean): string[] {
    forbiddenNodes = forbiddenNodes ? forbiddenNodes : [];
    const distance = nodeSkipCount ? 1 + nodeSkipCount : 1;
    const grid = this.grid.getValue();
    const gridArray = grid.gridArray;
    const nodes = grid.nodes;
    const neighbors: string[] = [];
    const coordinates = currentNodeId.split('-');
    const row = parseInt(coordinates[0], 10);
    const col = parseInt(coordinates[1], 10);
    let neighbor: string;
    if (gridArray[row - distance]) {
      neighbor = `${row - distance}-${col}`;
      if (!forbiddenNodes.includes(nodes[neighbor].status) && !(skipVisited && nodes[neighbor].visited)) {
        neighbors.push(neighbor);
      }
    }
    if (gridArray[row][col + distance]) {
      neighbor = `${row}-${col + distance}`;
      if (!forbiddenNodes.includes(nodes[neighbor].status) && !(skipVisited && nodes[neighbor].visited)) {
        neighbors.push(neighbor);
      }
    }
    if (gridArray[row + distance]) {
      neighbor = `${row + distance}-${col}`;
      if (!forbiddenNodes.includes(nodes[neighbor].status) && !(skipVisited && nodes[neighbor].visited)) {
        neighbors.push(neighbor);
      }
    }
    if (gridArray[row][col - distance]) {
      neighbor = `${row}-${col - distance}`;
      if (!forbiddenNodes.includes(nodes[neighbor].status) && !(skipVisited && nodes[neighbor].visited)) {
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
    let direction = '';
    if (nextRow > currentRow) {
      direction = 'down';
    } else if (nextRow < currentRow) {
      direction = 'up';
    } else if (nextCol > currentCol) {
      direction = 'right';
    } else if (nextCol < currentCol) {
      direction = 'left';
    }
    return direction;
  }

  getConnectingNodes(currentNodeId: string, nextNodeId: string): string[] {
    let coordinates = currentNodeId.split('-');
    const currentRow = parseInt(coordinates[0], 10);
    const currentCol = parseInt(coordinates[1], 10);
    coordinates = nextNodeId.split('-');
    const nextRow = parseInt(coordinates[0], 10);
    const nextCol = parseInt(coordinates[1], 10);
    const nodeIds: string[] = [];
    if (nextRow > currentRow) {
      for (let i = currentRow + 1; i < nextRow; i++) {
        nodeIds.push(`${i}-${currentCol}`);
      }
    } else if (nextRow < currentRow) {
      for (let i = nextRow + 1; i < currentRow; i++) {
        nodeIds.push(`${i}-${currentCol}`);
      }
    } else if (nextCol > currentCol) {
      for (let i = currentCol + 1; i < nextCol; i++) {
        nodeIds.push(`${currentRow}-${i}`);
      }
    } else if (nextCol < currentCol) {
      for (let i = nextCol + 1; i < currentCol; i++) {
        nodeIds.push(`${currentRow}-${i}`);
      }
    }
    return nodeIds;
  }

  getCoordinates(id: string) {
    const coordinates = id.split('-');
    const x = parseInt(coordinates[0], 10);
    const y = parseInt(coordinates[1], 10);
    return { x, y };
  }
}
