/**
 * https://leetcode.com/problems/make-the-prefix-sum-non-negative
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

/**
 * @param {number[]} nums
 * @return {number}
 */
var makePrefSumNonNegative = function(nums) {
    let prefixSum = 0;
    let ops = 0;
    const heap = new MinHeap();
    for(const n of nums) {
        if(n < 0) {
            heap.push(n);
        }
        prefixSum += n;
        if(prefixSum < 0) {
            prefixSum -= heap.pop();
            ops++;
        } 
    }

    return ops;
};
