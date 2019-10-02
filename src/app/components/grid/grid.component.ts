import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Node } from '../../models/node.model';
import { UnweightedAlgorithmsService } from '../../services/unweighted-algorithms.service';
import { VisualizerService } from '../../services/visualizer.service';

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
  pressedNodeStatus: string;
  previousNode: Node;
  previousElement: HTMLElement;
  previousNodeStatus: string;

  nodeHeight = 25;
  nodeWidth = 26;
  gridArray: Node[][] = [];
  nodes: { [id: string]: Node } = {};
  specialNodeStatuses = ['start', 'target'];
  nodesToAnimate = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private unweightedAlgorithms: UnweightedAlgorithmsService,
    private visualizerService: VisualizerService
    ) { }

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
        nodeArray.push(node);
        this.nodes[id] = node;
      }
      this.gridArray.push(nodeArray);
    }
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
      case 'target': this.target = currentNode.id; break;
      case 'start': this.start = currentNode.id; break;
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
        case 'target': this.target = currentNode.id; break;
        case 'start': this.start = currentNode.id; break;
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

  clearWalls() {
    Object.keys(this.nodes).forEach(id => {
      const node = this.nodes[id];
      const nodeElement = document.getElementById(id);
      if (node.status === 'wall') {
        node.status = 'normal';
        nodeElement.className = 'normal';
      }
    });
  }

  runAlgorithm() {
    const success = this.unweightedAlgorithms.bfs(this.start, this.target, this.nodes, this.nodesToAnimate, this.gridArray);
    this.visualizerService.visualize(this.nodesToAnimate);
  }

}
