import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { Node } from '../models/node.model';

@Directive({
  selector: '[appNode]'
})
export class NodeDirective implements OnChanges {
  @Input() node: Node;

  constructor(private element: ElementRef) { }

  ngOnChanges() {
    this.node.element = this.element.nativeElement as HTMLElement;
  }

}
