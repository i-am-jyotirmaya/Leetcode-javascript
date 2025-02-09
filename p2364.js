/**
 * https://leetcode.com/problems/count-number-of-bad-pairs
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var countBadPairs = function(nums) {
    const totalPairs = (nums.length * (nums.length - 1)) / 2;
    const diffMap = new Map();
    for(let i = 0; i < nums.length; i++) {
        diffMap.set(i - nums[i], (diffMap.get(i - nums[i]) ?? 0) + 1);
    }

    let goodPairs = 0;

    for(const vals of diffMap.values()) {
        if(vals >= 2) {
            const numPairs = (vals * (vals - 1)) / 2;
            goodPairs += numPairs;
        }
    }

    return totalPairs - goodPairs;
};

const inputs = [
    [4,1,3,3],
    [1,2,3,4,5]
];

for(const input of inputs) {
    console.log(`Input = ${JSON.stringify(input)}, Output: ${countBadPairs(input)}`);
}