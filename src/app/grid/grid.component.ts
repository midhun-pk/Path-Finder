import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Node } from '../models/node.model';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
  @ViewChild('grid', { static: false }) grid: ElementRef;

  rows: number;
  columns: number;
  gridHTML: string;
  start: string;
  target: string;
  isMousePressed: boolean;
  pressedNodeId: string;
  pressedNodeStatus: string;
  selectedNodeId: string;

  nodeHeight = 25;
  nodeWidth = 26;
  gridArray: Node[][] = [];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.rows = Math.floor((this.grid.nativeElement as HTMLElement).offsetHeight / this.nodeHeight);
    this.columns = Math.floor((this.grid.nativeElement as HTMLElement).offsetWidth / this.nodeWidth);
    this.createGrid();
    this.cdr.detectChanges();
  }

  createGrid() {
    for (let i = 0; i < this.rows; i++) {
      const nodeArray: Node[] = [];
      for (let j = 0; j < this.columns; j++) {
        const id = `${i}-${j}`;
        let status = 'normal';
        if (i === Math.floor(this.rows / 2) && j === Math.floor(this.columns / 4)) {
          this.start = id;
          status = 'start';

        } else if (i === Math.floor(this.rows / 2) && j === Math.floor(3 * this.columns / 4)) {
          this.target = id;
          status = 'target';
        }
        const node = new Node();
        node.id = id;
        node.status = status;
        node.previousStatus = 'normal';
        nodeArray.push(node);
      }
      this.gridArray.push(nodeArray);
    }
  }

  onMouseDown(event: Event, currentNode: Node) {
    this.isMousePressed = true;
    this.pressedNodeId = currentNode.id;
    this.pressedNodeStatus = currentNode.status;
    event.preventDefault();
  }

  onMouseUp() {
    this.isMousePressed = false;
  }

  onMouseEnter(currentNode: Node, element: HTMLElement) {
    if (this.isMousePressed) {
      if (this.pressedNodeStatus === 'target') {
        this.target = currentNode.id;
        this.changeSpecialNode(currentNode, element);
      }
    }
  }

  onMouseLeave(currentNode: Node, element: HTMLElement) {
    if (this.isMousePressed) {
      this.changeSpecialNode(currentNode, element);
    }
  }

  changeSpecialNode(currentNode: Node, element: HTMLElement) {
    if (currentNode.status !== this.pressedNodeStatus) {
      currentNode.previousStatus = currentNode.status;
      currentNode.status = this.pressedNodeStatus;
      element.className = this.pressedNodeStatus;
    } else if (currentNode.status === this.pressedNodeStatus) {
      this.selectedNodeId = currentNode.id;
      currentNode.status = currentNode.previousStatus;
      element.className = currentNode.previousStatus;
    }
  }

}
