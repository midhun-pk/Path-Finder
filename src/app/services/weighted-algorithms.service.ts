import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { PriorityQueue } from '../data-structures/priority-queue.model';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root'
})
export class WeightedAlgorithmsService {

  constructor(
    private gridService: GridService
  ) { }

  /**
   * Find the shortest path between start and the target nodes
   * @param grid Grid details
   */
  dijikstra(grid: Grid) {
    grid.nodesToAnimate = [];
    if (!grid.start || !grid.target || grid.start === grid.target) {
      return false;
    }
    let found = false;
    const forbiddenNodes = ['wall'];
    grid.nodes[grid.start].distance = 0;
    const PQ = new PriorityQueue();
    PQ.insert(grid.start, 0);
    while (!PQ.isEmpty()) {
      const currentNodeId = PQ.extractMinimum();
      if (!grid.nodes[currentNodeId].visited) {
        grid.nodes[currentNodeId].visited = true;
        grid.nodesToAnimate.push(grid.nodes[currentNodeId]);
      }
      if (currentNodeId === grid.target) {
        found = true;
        break;
      }
      const neighbors = this.gridService.getNeighbors(currentNodeId, forbiddenNodes, 0, true);
      neighbors.forEach(neighbor => {
        const newDistance = grid.nodes[currentNodeId].distance + 1; // assuming weight = 1
        if (grid.nodes[neighbor].distance > newDistance) {
          if (grid.nodes[neighbor].distance === Infinity) {
            PQ.insert(neighbor, newDistance);
          } else {
            PQ.decreaseKey(neighbor, newDistance);
          }
          grid.nodes[neighbor].distance = newDistance;
          grid.nodes[neighbor].previousNode = currentNodeId;
        }
      });
    }
    while (!PQ.isEmpty()) {
      const currentNodeId = PQ.extractMinimum();
      grid.nodes[currentNodeId].distance = Infinity;
      grid.nodes[currentNodeId].previousNode = null;
    }
    return found;
  }

  aStarSearch(grid: Grid) {
    const currentNode = grid.nodes[grid.start];
    currentNode.distance = 0;
    currentNode.globalDistance = this.heuristic(grid.start, grid.target);
  }

  heuristic(start: string, target: string) {
    let coordinates = this.gridService.getCoordinates(start);
    const x1 = coordinates.x;
    const y1 = coordinates.y;
    coordinates = this.gridService.getCoordinates(target);
    const x2 = coordinates.x;
    const y2 = coordinates.y;
    return this.manhattanDistance(x1, x2, y1, y2);
  }

  manhattanDistance(x1: number, y1: number, x2: number, y2: number): number {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
  }
}
