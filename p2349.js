/**
 * https://leetcode.com/problems/design-a-number-container-system
 */

class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(val) {
        this.heap.push(val);
        this._heapifyUp();
    }

    pop() {
        if (this.heap.length === 0) return null;
        this._swap(0, this.heap.length - 1);
        const removed = this.heap.pop();
        this._heapifyDown();
        return removed;
    }

    peek() {
        return this.heap.length > 0 ? this.heap[0] : null;
    }

    _heapifyUp() {
        let idx = this.heap.length - 1;
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            if (this.heap[parentIdx] <= this.heap[idx]) break;
            this._swap(parentIdx, idx);
            idx = parentIdx;
        }
    }

    _heapifyDown() {
        let idx = 0;
        while (2 * idx + 1 < this.heap.length) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let smallest = left;
            if (right < this.heap.length && this.heap[right] < this.heap[left]) {
                smallest = right;
            }
            if (this.heap[idx] <= this.heap[smallest]) break;
            this._swap(idx, smallest);
            idx = smallest;
        }
    }

    _swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
    }

    size() {
        return this.heap.length;
    }
}

var NumberContainers = function() {
    this.indexMap = new Map();
    this.valueMap = new Map();
};

/** 
 * @param {number} index 
 * @param {number} number
 * @return {void}
 */
NumberContainers.prototype.change = function(index, number) {
    if (this.indexMap.has(index)) {
        let oldNumber = this.indexMap.get(index);
        if (oldNumber !== number) {
            this.indexMap.set(index, number);
            this.valueMap.get(oldNumber).push(-1);
        }
    } else {
        this.indexMap.set(index, number);
    }
    if (!this.valueMap.has(number)) {
        this.valueMap.set(number, new MinHeap());
    }
    this.valueMap.get(number).push(index);
};

/** 
 * @param {number} number
 * @return {number}
 */
NumberContainers.prototype.find = function(number) {
    if (!this.valueMap.has(number)) return -1;
    let heap = this.valueMap.get(number);
    while (heap.size() > 0 && this.indexMap.get(heap.peek()) !== number) {
        heap.pop();
    }
    return heap.size() > 0 ? heap.peek() : -1;
};

/** 
 * Your NumberContainers object will be instantiated and called as such:
 * var obj = new NumberContainers()
 * obj.change(index,number)
 * var param_2 = obj.find(number)
 */