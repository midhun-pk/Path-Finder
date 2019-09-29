import { Injectable } from '@angular/core';
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class UnweightedAlgorithmsService {

  constructor() { }

  bfs(start: string, target: string, nodes: { [id: string]: Node }, nodesToAnimate: Node[], grid: Node[][]) {
    if (!start || !target || start === target) {
      return false;
    }
    const deque = [nodes[start]];
    while (deque.length !== 0) {
      const currentNode = deque.shift();
      currentNode.visited = true;
      nodesToAnimate.push(currentNode);
      if (currentNode.id === target) {
        return true;
      }
      const neighbors = this.getNeighbors(currentNode, nodes, grid);
      neighbors.forEach(neighbor => {
        if (!nodes[neighbor].visited && !deque.includes(nodes[neighbor])) {
          nodes[neighbor].previousNode = currentNode.id;
          deque.push(nodes[neighbor]);
        }
      });
    }
    return false;
  }

  getNeighbors(currentNode: Node, nodes: { [id: string]: Node }, grid: Node[][]): string[] {
    const neighbors: string[] = [];
    const coordinates = currentNode.id.split('-');
    const row = parseInt(coordinates[0], 10);
    const col = parseInt(coordinates[1], 10);
    let neighbor: string;
    if (grid[row - 1] && grid[row - 1][col]) {
      neighbor = `${row - 1}-${col}`;
      if (nodes[neighbor].status !== 'wall') {
        neighbors.push(neighbor);
      }
    }
    if (grid[col - 1] && grid[row][col - 1]) {
      neighbor = `${row}-${col - 1}`;
      if (nodes[neighbor].status !== 'wall') {
        neighbors.push(neighbor);
      }
    }
    if (grid[row + 1] && grid[row + 1][col]) {
      neighbor = `${row + 1}-${col}`;
      if (nodes[neighbor].status !== 'wall') {
        neighbors.push(neighbor);
      }
    }
    if (grid[col + 1] && grid[row][col + 1]) {
      neighbor = `${row}-${col + 1}`;
      if (nodes[neighbor].status !== 'wall') {
        neighbors.push(neighbor);
      }
    }
    return neighbors;
  }
}
