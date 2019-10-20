export class PriorityQueue {
    size = 0;
    array: [string | number, number][] = [];
    position = {};

    isEmpty(): boolean {
        return this.size === 0;
    }

    left(index: number): number {
        return 2 * index + 1;
    }

    right(index: number): number {
        return 2 * index + 2;
    }

    parent(index: number): number {
        return Math.floor(index / 2);
    }

    min_heapify(index: number) {
        const leftChild = this.left(index);
        const rightChild = this.right(index);
        let smallest = index;
        if (leftChild < this.size && this.array[leftChild][1] < this.array[index][1]) {
            smallest = leftChild;
        }
        if (rightChild < this.size && this.array[rightChild][1] < this.array[smallest][1]) {
            smallest = rightChild;
        }
        if (smallest !== index) {
            this.swap(smallest, index);
            this.min_heapify(smallest);
        }
    }

    swap(index1: number, index2: number) {
        this.position[this.array[index1][0]] = index2;
        this.position[this.array[index2][0]] = index1;
        const temp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = temp;
    }

    insert(node: string | number, key: number) {
        this.position[node] = this.size;
        this.size += 1;
        this.array.push([node, Infinity]);
        this.decreaseKey(node, key);
    }

    decreaseKey(node: string | number, key: number) {
        let index = this.position[node];
        const parentIndex = this.parent(index);
        this.array[index] = [node, key];
        while (index > 0 && this.array[parentIndex][1] > this.array[index][1]) {
            this.swap(index, parentIndex);
            index = parentIndex;
        }
    }

    extractMinimum() {
        const minimumNode = this.array[0][0];
        this.array[0] = this.array[this.size - 1];
        this.size -= 1;
        this.min_heapify(0);
        delete this.position[minimumNode];
        return minimumNode;
    }
}
