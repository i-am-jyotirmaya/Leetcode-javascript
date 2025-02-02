/**
 * https://leetcode.com/problems/check-if-array-is-sorted-and-rotated
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function(nums) {
    let peakFound = false;
    for(let i = 0; i < nums.length; i++) {
        if(nums[i] > nums[(i+1)%nums.length]) {
            if(peakFound) return false;
            peakFound = true;
        }
    }
    return true;
};