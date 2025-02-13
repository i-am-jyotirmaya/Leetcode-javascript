/**
 * https://leetcode.com/problems/minimum-operations-to-exceed-threshold-value-ii
 */

/**
 * Following implementation of a Min-Heap supports initializing the heap
 * using an array in O(N) time. 
 * This is used to save time when adding elements to the heap.
 * In case we add all elements after creating the heap, time taken would be O(nlogN).
 * In this case, time taken would be O(N).
 * This would optimise total time take from (O(NlogN) + O(NlogN)) to (O(N) + O(NlogN)).
 */
class MinHeap {
    constructor(arr = []) {
        this.heap = arr;
        if (arr.length > 0) {
            this._buildHeap(); // Convert array into a min-heap in O(N)
        }
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

    size() {
        return this.heap.length;
    }

    /*** Heapify Methods ***/
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

    /*** O(N) Heapify for Initialization ***/
    _buildHeap() {
        let n = this.heap.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            this._heapifyDownFrom(i, n);
        }
    }

    _heapifyDownFrom(idx, n) {
        while (2 * idx + 1 < n) {
            let left = 2 * idx + 1;
            let right = 2 * idx + 2;
            let smallest = left;

            if (right < n && this.heap[right] < this.heap[left]) {
                smallest = right;
            }
            if (this.heap[idx] <= this.heap[smallest]) break;
            this._swap(idx, smallest);
            idx = smallest;
        }
    }
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function(nums, k) {
    const heap = new MinHeap(nums);
    let ops = 0;
    while(heap.peek() < k) {
        heap.push((2 * heap.pop()) + heap.pop());
        ops++;
    }

    return ops;
};

const inputs = [
    [[2,11,10,1,3], 10],
    [[1,1,2,4,9], 20]
];

for(const [nums, k] of inputs) {
    console.log(`Input = nums: ${JSON.stringify(nums)}, k: ${k}\nOutput = ${minOperations(nums, k)}`);
}