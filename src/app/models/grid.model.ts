import { Node } from './node.model';

export class Grid {
    rows: number;
    columns: number;
    start: string;
    target: string;
    nodes: { [id: string]: Node } = {};
    nodesToAnimate: Node[] = [];
    gridArray: Node[][] = [];
}
