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
  pressedNode: Node;

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
        let status = 'unvisited';
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
      }
      this.gridArray.push(nodeArray);
    }
  }

  onMouseDown(event: Event, node: Node) {
    this.isMousePressed = true;
    this.pressedNode = node;
    event.preventDefault();
  }

  onMouseUp() {
    this.isMousePressed = false;
  }

  onMouseEnter(node: Node) {
    if (this.isMousePressed) {
      if (this.pressedNode.status === 'target') {
        this.target = node.id;
      }
    }
  }

  onMouseLeave() {
    if (this.isMousePressed) {

    }
  }

}
