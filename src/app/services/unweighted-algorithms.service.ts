import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root'
})
export class UnweightedAlgorithmsService {

  constructor(private gridService: GridService) { }

  bfs(grid: Grid): boolean {
    if (!grid.start || !grid.target || grid.start === grid.target) {
      return false;
    }
    const blockedNeighbors = ['wall'];
    const deque = [grid.nodes[grid.start]];
    while (deque.length !== 0) {
      const currentNode = deque.shift();
      currentNode.visited = true;
      grid.nodesToAnimate.push(currentNode);
      if (currentNode.id === grid.target) {
        return true;
      }
      const neighbors = this.gridService.getNeighbors(currentNode, blockedNeighbors);
      neighbors.forEach(neighbor => {
        if (!grid.nodes[neighbor].visited && !deque.includes(grid.nodes[neighbor])) {
          grid.nodes[neighbor].previousNode = currentNode.id;
          deque.push(grid.nodes[neighbor]);
        }
      });
    }
    return false;
  }

  dfs(grid: Grid) {
    if (!grid.start || !grid.target || grid.start === grid.target) {
      return false;
    }
    const blockedNeighbors = ['wall'];
    const stack = [grid.nodes[grid.start]];
    while (stack.length !== 0) {
      const currentNode = stack.pop();
      if (!currentNode.visited) {
        currentNode.visited = true;
        grid.nodesToAnimate.push(currentNode);
      } else {
        continue;
      }
      if (currentNode.id === grid.target) {
        return true;
      }
      const neighbors = this.gridService.getNeighbors(currentNode, blockedNeighbors);
      neighbors.forEach(neighbor => {
        if (!grid.nodes[neighbor].visited) {
          grid.nodes[neighbor].previousNode = currentNode.id;
          stack.push(grid.nodes[neighbor]);
        }
      });
    }
    return false;
  }
}
