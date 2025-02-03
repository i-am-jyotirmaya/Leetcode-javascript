/**
 * https://leetcode.com/problems/longest-strictly-increasing-or-strictly-decreasing-subarray
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var longestMonotonicSubarray = function(nums) {
    let longestIncreasing = 1, longestDecreasing = 1, maximum = 1;
    for(let i = 1; i < nums.length; i++) {
        if(nums[i - 1] < nums[i]) {
            longestIncreasing++;
            maximum = Math.max(maximum, longestIncreasing);
            longestDecreasing = 1;
        } else if(nums[i - 1] > nums[i]) {
            longestDecreasing++;
            maximum = Math.max(maximum, longestDecreasing);
            longestIncreasing = 1 ;
        } else {
            longestDecreasing = 1;
            longestIncreasing = 1;
        }
    }

    return maximum;
};