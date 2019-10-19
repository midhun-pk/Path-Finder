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

    min_heapify(index: number) {
        const leftChild = this.left(index);
        const rightChild = this.right(index);
        let smallest = index;
        if (leftChild < this.size && this.array[leftChild] < this.array[index]) {
            smallest = leftChild;
        }
        if (rightChild < this.size && this.array[rightChild] < this.array[smallest]) {
            smallest = rightChild;
        }
        if (smallest !== index) {
            this.swap(smallest, index);
            this.min_heapify(smallest);
        }
    }

    swap(index1: number, index2: number) {
        const temp = this.array[index1];
        this.array[index1] = this.array[index2];
        this.array[index2] = temp;
    }
}
