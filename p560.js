/**
 * https://leetcode.com/problems/subarray-sum-equals-k
 */

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
    const prefixes = new Map();
    prefixes.set(0, 1);
    let sum = 0;
    let count = 0;
    for(const n of nums) {
        sum += n;
        count += prefixes.get(sum - k) ?? 0;
        prefixes.set(sum, 1 + (prefixes.get(sum) ?? 0));
    }

    return count;
};

console.log(subarraySum([1, 2, 3], 3))