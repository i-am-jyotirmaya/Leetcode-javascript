/**
 * https://leetcode.com/problems/construct-smallest-number-from-di-string
 */

/**
 * @param {string} pattern
 * @return {string}
 */
var smallestNumber = function (pattern) {
  const stack = [1];
  let res = "";
  for (let i = 0; i < pattern.length; i++) {
    if (pattern[i] === "I") {
      while (stack.length) {
        res += stack.pop();
      }
      stack.push(i + 2);
    } else {
      stack.push(i + 2);
    }
  }
  while (stack.length) {
    res += stack.pop();
  }

  return res;
};

const inputs = ["IIIDIDDD", "DDD", "IIDDDIDI"];

for (const input of inputs) {
  console.log(
    `Input = ${JSON.stringify(input)}\nOutput = ${JSON.stringify(smallestNumber(input))}`
  );
}
