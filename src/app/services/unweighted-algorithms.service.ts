import { Injectable } from '@angular/core';
import { Node } from '../models/node.model';
import { Grid } from '../models/grid.model';

@Injectable({
  providedIn: 'root'
})
export class UnweightedAlgorithmsService {

  constructor() { }

  bfs(grid: Grid): boolean {
    if (!grid.start || !grid.target || grid.start === grid.target) {
      return false;
    }
    const deque = [grid.nodes[grid.start]];
    while (deque.length !== 0) {
      const currentNode = deque.shift();
      currentNode.visited = true;
      grid.nodesToAnimate.push(currentNode);
      if (currentNode.id === grid.target) {
        return true;
      }
      const neighbors = this.getNeighbors(currentNode, grid.nodes, grid.gridArray);
      neighbors.forEach(neighbor => {
        if (!grid.nodes[neighbor].visited && !deque.includes(grid.nodes[neighbor])) {
          grid.nodes[neighbor].previousNode = currentNode.id;
          deque.push(grid.nodes[neighbor]);
        }
      });
    }
    return false;
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
    if (gridArray[row][col - 1]) {
      neighbor = `${row}-${col - 1}`;
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
    if (gridArray[row][col + 1]) {
      neighbor = `${row}-${col + 1}`;
      if (nodes[neighbor].status !== 'wall') {
        neighbors.push(neighbor);
      }
    }
    return neighbors;
  }
}
