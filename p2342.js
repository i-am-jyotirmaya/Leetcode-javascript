/**
 * https://leetcode.com/problems/max-sum-of-a-pair-with-equal-sum-of-digits
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumSum = function(nums) {
    const getDigitSum = (num) => {
        let sum = 0;
        while(num) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }

        return sum;
    }
    const map = new Map();

    let largestPairSum = -1;

    for(const num of nums) {
        const digitSum = getDigitSum(num);
        if(!map.has(digitSum)) {
            map.set(digitSum, num);
            continue;
        }
        const maxNum = map.get(digitSum);

        largestPairSum = Math.max(largestPairSum, maxNum + num);

        if(num > maxNum) {
            map.set(digitSum, num);
        }
    }

    return largestPairSum;
};

const inputs = [
    [18,43,36,13,7],
    [10,12,19,14]
];

for(const input of inputs) {
    console.log(`Input = ${JSON.stringify(input)}\nOutput = ${maximumSum(input)}`);
}