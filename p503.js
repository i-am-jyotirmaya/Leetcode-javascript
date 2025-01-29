/**
 * https://leetcode.com/problems/next-greater-element-ii/
 */
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nextGreaterElements = function(nums) {
    const len = nums.length;
    let n = 2 * len - 1;
    const res = Array(len);
    const stack = [];
    while(n >= 0) {
        while(stack.length && nums[n % len] >= nums[stack[stack.length - 1]]) {
            stack.pop();
        }
        res[n % len] = !stack.length ? -1 : nums[stack[stack.length - 1]];
        stack.push(n % len);

        n--;
    }

    return res;
    
};
