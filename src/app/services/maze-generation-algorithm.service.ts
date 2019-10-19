import { Injectable } from '@angular/core';
import { Grid } from '../models/grid.model';
import { Node } from '../models/node.model';
import { GridService } from './grid.service';

@Injectable({
  providedIn: 'root'
})
export class MazeGenerationAlgorithmService {

  constructor(
    private gridService: GridService
  ) { }

  addBorderWalls(grid: Grid) {
    grid.nodesToAnimate.push(grid.gridArray[0][0]);
    grid.gridArray[0][0].visited = true;
    grid.nodesToAnimate.push(grid.gridArray[0][0]);
    let i = 0;
    let j = 1;
    while (!(i === 0 && j === 0)) {
      grid.nodesToAnimate.push(grid.gridArray[i][j]);
      grid.gridArray[i][j].visited = true;
      grid.nodesToAnimate.push(grid.gridArray[i][j]);
      if (i === 0 && j < grid.columns - 1) {
        j += 1;
      } else if (j === grid.columns - 1 && i < grid.rows - 1) {
        i += 1;
      } else if (i === grid.rows - 1 && j > 0) {
        j -= 1;
      } else if (j === 0 && i > 0) {
        i -= 1;
      }
    }
  }

  recursiveBacktracking(grid: Grid) {
    const specialNodes = ['start', 'target'];
    grid.nodesToAnimate = [];
    this.addBorderWalls(grid);
    const numberOfNodesVisited = 0;
    const stack: Node[] = [];
    stack.push(grid.gridArray[1][1]);
    grid.gridArray[0][0].visited = true;
    while (stack.length > 0) {
      const currentNode = stack[stack.length - 1];
      const neighbors = this.gridService.getNeighbors(currentNode.id, [], 1, true);
      if (neighbors.length > 0) {
        const nextNodeId = neighbors[Math.ceil(Math.random() * 100) % neighbors.length];
        const connectingNodeIds = this.gridService.getConnectingNodes(currentNode.id, nextNodeId);
        connectingNodeIds.forEach(nodeId => grid.nodes[nodeId].visited = true);
        grid.nodes[nextNodeId].visited = true;
        stack.push(grid.nodes[nextNodeId]);
      } else {
        stack.pop();
      }
    }
    Object.keys(grid.nodes).forEach(id => {
      const node = grid.nodes[id];
      if (!node.visited && !specialNodes.includes(node.status)) {
        grid.nodesToAnimate.push(node);
      }
      node.visited = false;
    });
  }
}
