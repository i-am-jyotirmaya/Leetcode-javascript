/**
 * https://leetcode.com/problems/tuple-with-same-product
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
var tupleSameProduct = function(nums) {
  const productsMap = new Map();
  let pairCount = 0;
  for(let i = 0; i < nums.length; i++) {
    for(let j = i + 1; j < nums.length; j++) {
        const product = nums[i] * nums[j];
        productsMap.set(product, (productsMap.get(product) ?? 0) + 1);
    }
  }
  for(const freqs of productsMap.values()) {
    pairCount += ((freqs - 1) * freqs) / 2;
  }
  return pairCount * 8;
};

const inputs = [
    [2,3,4,6,8,12],
    [2,3,4,6],
    [1,2,4,5,10]
];

for(const input of inputs) {
    console.log(`Input: nums = ${JSON.stringify(input)}, Output:\n${tupleSameProduct(input)}`);
}