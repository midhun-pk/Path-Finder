import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { BehaviorSubject } from 'rxjs';
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class GridAnimationService {
  relevantClassNames = ['start', 'target', 'visitedStartNode'];
  animatedNodeIds: string[] = [];
  isAnimating = new BehaviorSubject<boolean>(false);
  isPathFindingAlgorithmVisualized = new BehaviorSubject<boolean>(false);

  constructor() { }

  isCurrentlyAnimating(): BehaviorSubject<boolean> {
    return this.isAnimating;
  }

  animateAlgorithm(grid: Grid) {
    this.isAnimating.next(true);
    this.animateAlgorithmTimeout(grid, 0);
  }

  /**
   * Animate the current running algorithm
   * @param grid Grid model
   * @param index Current animating index
   */
  animateAlgorithmTimeout(grid: Grid, index: number) {
    setTimeout(() => {
      if (index === 0) {
        const startNode = grid.nodes[grid.start];
        startNode.element.className = 'visitedStartNode';
      } else if (index === grid.nodesToAnimate.length) {
        const previousNode = grid.nodesToAnimate[index - 1];
        if (previousNode.status === 'target') {
          previousNode.element.className = 'visitedTargetNode';
          this.animateShortestPath(grid);
        } else {
          previousNode.element.className = 'visited';
          this.isAnimating.next(false);
        }
        grid.nodesToAnimate = [];
        this.isPathFindingAlgorithmVisualized.next(true);
        return;
      } else {
        const currentNode = grid.nodesToAnimate[index];
        if (!this.relevantClassNames.includes(currentNode.element.className)) {
          currentNode.element.className = 'current';
        }
        const previousNode = grid.nodesToAnimate[index - 1];
        if (!this.relevantClassNames.includes(previousNode.element.className)) {
          previousNode.element.className = 'visited';
        }
      }
      const animatedNodeId = grid.nodesToAnimate[index].id;
      if (!this.animatedNodeIds.includes(animatedNodeId)) {
        this.animatedNodeIds.push(animatedNodeId);
      }
      this.animateAlgorithmTimeout(grid, index + 1);
    }, 0);
  }

  /**
   * Animate the shortest path found by the current algorithm
   * @param grid Grid model
   */
  animateShortestPath(grid: Grid) {
    grid.shortestPathNodesToAnimate = [];
    let currentNode = grid.nodesToAnimate[grid.nodesToAnimate.length - 1];
    while (currentNode.id !== grid.start) {
      grid.shortestPathNodesToAnimate.push(currentNode);
      currentNode = grid.nodes[currentNode.previousNode];
    }
    grid.shortestPathNodesToAnimate.push(currentNode);
    grid.shortestPathNodesToAnimate.reverse();
    this.animateShortestPathTimeout(grid, 0);
  }

  animateShortestPathTimeout(grid: Grid, index: number) {
    setTimeout(() => {
      const currentNode = grid.shortestPathNodesToAnimate[index];
      let className = index === 0 ? 'shortest-path-start' : 'shortest-path';
      if (index < grid.shortestPathNodesToAnimate.length - 1) {
        const nextNode = grid.shortestPathNodesToAnimate[index + 1];
        const direction = this.getDirection(currentNode, nextNode);
        className += ' ' + direction;
      }
      if (index === 0) {
        currentNode.element.className = className;
      } else if (index === grid.shortestPathNodesToAnimate.length - 1) {
        currentNode.element.className = 'shortest-path-target';
        this.isAnimating.next(false);
        return;
      } else {
        currentNode.element.className = className;
      }
      this.animateShortestPathTimeout(grid, index + 1);
    }, 40);
  }

  getDirection(currentNode: Node, nextNode: Node): string {
    let coordinates = currentNode.id.split('-');
    const currentRow = parseInt(coordinates[0], 10);
    const currentCol = parseInt(coordinates[1], 10);
    coordinates = nextNode.id.split('-');
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

  clearAnimation(grid: Grid) {
    while (this.animatedNodeIds.length > 0) {
      const id = this.animatedNodeIds.shift();
      const node = grid.nodes[id];
      if (node.status === 'start') {
        node.element.className = 'start';
      } else if (node.status === 'target') {
        node.element.className = 'target';
      } else if (node.visited) {
        node.element.className = 'normal';
        node.status = 'normal';
      }
      node.visited = false;
      node.previousNode = null;
    }
    this.isPathFindingAlgorithmVisualized.next(true);
  }

}
