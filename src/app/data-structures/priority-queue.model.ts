export class PriorityQueue {
    size = 0;
    array = [];
    pos = {};

    isEmpty(): boolean {
        return this.size === 0;
    }

    left(index: number): number {
        return 2 * index + 1;
    }

    right(index: number): number {
        return 2 * index + 2;
    }
}
