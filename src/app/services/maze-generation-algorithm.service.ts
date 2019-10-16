import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { Node } from '../models/node.model';

@Injectable({
  providedIn: 'root'
})
export class MazeGenerationAlgorithmService {

  constructor() { }

  recursiveBacktracking(grid: Grid) {
    const numberOfNodeVisited = 0;
    const stack: Node[] = [];

    stack.push(grid.gridArray[0][0]);
    while (stack.length > 0) {
      const currentNode = stack.pop();
    }
  }

  getNeighbors(currentNode: Node) {
    const neighbors: string[] = [];
    const coordinates = currentNode.id.split('-');
  }
}
