import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Node } from '../../models/node.model';
import { Grid } from 'src/app/models/grid.model';
import { GridService } from 'src/app/services/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
  @ViewChild('grid', { static: false }) gridElement: ElementRef;

  isMousePressed: boolean;
  pressedNodeStatus: string;
  previousNode: Node;
  previousElement: HTMLElement;
  previousNodeStatus: string;
  grid: Grid;
  gridArray: Node[][] = [];

  nodeHeight = 25;
  nodeWidth = 26;
  specialNodeStatuses = ['start', 'target'];

  constructor(
    private cdr: ChangeDetectorRef,
    private gridService: GridService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.createGrid();
    this.cdr.detectChanges();
  }

  createGrid() {
    const grid = new Grid();
    grid.rows = Math.floor((this.gridElement.nativeElement as HTMLElement).offsetHeight / this.nodeHeight);
    grid.columns = Math.floor((this.gridElement.nativeElement as HTMLElement).offsetWidth / this.nodeWidth);
    for (let i = 0; i < grid.rows; i++) {
      const nodeArray: Node[] = [];
      for (let j = 0; j < grid.columns; j++) {
        const id = `${i}-${j}`;
        let status = 'normal';
        if (i === Math.floor(grid.rows / 2) && j === Math.floor(grid.columns / 4)) {
          grid.start = id;
          status = 'start';

        } else if (i === Math.floor(grid.rows / 2) && j === Math.floor(3 * grid.columns / 4)) {
          grid.target = id;
          status = 'target';
        }
        const node = new Node();
        node.id = id;
        node.status = status;
        nodeArray.push(node);
        grid.nodes[id] = node;
      }
      this.gridArray.push(nodeArray);
    }
    grid.gridArray = this.gridArray;
    this.gridService.setGrid(grid);
  }

  onMouseDown(event: Event, currentNode: Node, element: HTMLElement) {
    event.preventDefault();
    this.isMousePressed = true;
    if (this.specialNodeStatuses.includes(currentNode.status)) {
      this.pressedNodeStatus = currentNode.status;
    } else {
      this.pressedNodeStatus = 'normal';
      this.changeNormalNode(currentNode, element);
    }
  }

  onMouseUp(currentNode: Node) {
    this.isMousePressed = false;
    switch (this.pressedNodeStatus) {
      case 'target': this.grid.target = currentNode.id; break;
      case 'start': this.grid.start = currentNode.id; break;
      default: break;
    }
    this.pressedNodeStatus = 'normal';
  }

  onMouseEnter(currentNode: Node, element: HTMLElement) {
    if (!this.isMousePressed) { return; }
    if (this.specialNodeStatuses.includes(this.pressedNodeStatus)) {
      // If dragging a special node
      this.changeSpecialNode(currentNode, element);
      switch (this.pressedNodeStatus) {
        case 'target': this.grid.target = currentNode.id; break;
        case 'start': this.grid.start = currentNode.id; break;
        default: break;
      }
    } else {
      this.changeNormalNode(currentNode, element);
    }
  }

  onMouseLeave(currentNode: Node, element: HTMLElement) {
    if (this.isMousePressed) {
      this.changeSpecialNode(currentNode, element);
    }
  }

  changeSpecialNode(currentNode: Node, element: HTMLElement) {
    if (!this.specialNodeStatuses.includes(currentNode.status)) { // Current node is normal node (On enter)
      if (this.previousNode) {
        this.previousNode.status = this.previousNodeStatus;
        this.previousNode = null;
        this.previousElement = null;
        this.previousNodeStatus = currentNode.status;
        currentNode.status = this.pressedNodeStatus;
        element.className = this.pressedNodeStatus;
      }
    } else if (currentNode.status !== this.pressedNodeStatus) { // Current node is special but different status (On enter & leave)
      if (this.previousNode) {
        this.previousElement.className = this.pressedNodeStatus;
        this.previousNode.status = this.pressedNodeStatus;
      }
    } else if (currentNode.status === this.pressedNodeStatus) { // Current node is special and same status (On leave)
      this.previousElement = element;
      this.previousNode = currentNode;
      element.className = this.previousNodeStatus;
      currentNode.status = this.previousNodeStatus;
    }
  }

  changeNormalNode(currentNode: Node, element: HTMLElement) {
    if (!this.specialNodeStatuses.includes(currentNode.status)) {
      const status = currentNode.status === 'wall' ? 'noraml' : 'wall';
      currentNode.status = status;
      element.className = status;
    }
  }

}
