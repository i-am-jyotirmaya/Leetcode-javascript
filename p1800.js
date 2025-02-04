/**
 * https://leetcode.com/problems/maximum-ascending-subarray-sum
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAscendingSum = function(nums) {
    let maxSum = 0;
    let currSum = nums[0];
    for(let i = 1; i < nums.length; i++) {
        if(nums[i - 1] >= nums[i]) {
            maxSum = Math.max(maxSum, currSum);
            currSum = 0;
        }
        currSum += nums[i];
    }
    maxSum = Math.max(maxSum, currSum);
    return maxSum;
};