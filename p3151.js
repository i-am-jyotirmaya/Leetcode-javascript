/**
 * https://leetcode.com/problems/special-array-i
 */

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isArraySpecial = function(nums) {
    for(let i = 1; i < nums.length; i++) {
        if(nums[i] % 2 === nums[i - 1] % 2) {
            return false;
        }
    }
    return true;
};

const inputs = [
    [2,1,4],
    [4,3,1,6],
    [1]
];

for(const input of inputs) {
    console.log(`Input: ${JSON.stringify(input)}\nOutput: ${isArraySpecial(input)}`)
}