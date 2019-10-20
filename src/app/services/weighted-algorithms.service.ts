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
}
