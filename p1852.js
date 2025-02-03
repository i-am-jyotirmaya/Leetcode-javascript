/**
 * https://leetcode.com/problems/distinct-numbers-in-each-subarray
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var distinctNumbers = function(nums, k) {
    const seen = new Map();
    let i = 0;
    for(; i < k; i++) {
        if(!seen.has(nums[i])) {
            seen.set(nums[i], 0);
        }
        seen.set(nums[i], seen.get(nums[i]) + 1);
    }
    const res = [];
    res.push(seen.size);
    for(; i < nums.length; i++) {
        seen.set(nums[i - k], seen.get(nums[i - k]) - 1);
        if(seen.get(nums[i - k]) === 0) {
            seen.delete(nums[i - k]);
        }
        if(!seen.has(nums[i])) {
            seen.set(nums[i], 0);
        }
        seen.set(nums[i], seen.get(nums[i]) + 1);
        res.push(seen.size);
    }

    return res;
};

const inputs = [
    [[1,2,3,2,2,1,3], 3],
    [[1,1,1,1,2,3,4], 4]
];

for(const [nums, k] of inputs) {
    console.log(`Input: nums = ${JSON.stringify(nums)}, k = ${k}\nOutput: ${distinctNumbers(nums, k)}`);
}