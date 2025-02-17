/**
 * https://leetcode.com/problems/find-the-punishment-number-of-an-integer
 */

/**
 * @param {number} n
 * @return {number}
 */
var punishmentNumber = function (n) {
  let sum = 0;

  // Helper function to check if a number is a punishment number
  function isPunishmentNumber(x) {
    let squareStr = (x * x).toString();
    return canSplit(squareStr, 0, x, 0);
  }

  // Backtracking function to check if we can split squareStr to sum up to target
  function canSplit(squareStr, index, target, currentSum) {
    if (index === squareStr.length) {
      return currentSum === target;
    }

    let num = 0;
    for (let i = index; i < squareStr.length; i++) {
      num = num * 10 + parseInt(squareStr[i]); // Form the number by adding digits

      if (currentSum + num > target) break; // Stop if sum exceeds target

      if (canSplit(squareStr, i + 1, target, currentSum + num)) {
        return true;
      }
    }
    return false;
  }

  // Iterate through numbers from 1 to n
  for (let i = 1; i <= n; i++) {
    if (isPunishmentNumber(i)) {
      sum += i * i;
    }
  }

  return sum;
};
