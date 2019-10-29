export class Node {
    id: string;
    status: string;
    visited: boolean;
    previousNode: string;
    element: HTMLElement;
    weight = 0;
    distance = Infinity;
    globalDistance = Infinity;
}
