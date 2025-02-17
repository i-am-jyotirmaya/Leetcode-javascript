/**
 * https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence
 */

/**
 * @param {number} n
 * @return {number[]}
 */
var constructDistancedSequence = function (n) {
  let length = 2 * n - 1;
  let result = new Array(length).fill(0);
  let used = new Array(n + 1).fill(false);

  function backtrack(index) {
    // Base case: If the entire array is filled, return true
    if (index === length) {
      return true;
    }

    // If the current position is already occupied, move to the next
    if (result[index] !== 0) {
      return backtrack(index + 1);
    }

    // Try placing numbers from largest to smallest
    for (let num = n; num >= 1; num--) {
      if (used[num]) continue; // If num is already used, skip

      if (num === 1) {
        // 1 only appears once
        result[index] = 1;
        used[1] = true;
        if (backtrack(index + 1)) return true;
        result[index] = 0;
        used[1] = false;
      } else {
        let secondIndex = index + num;
        if (secondIndex < length && result[secondIndex] === 0) {
          // Place num at both positions
          result[index] = result[secondIndex] = num;
          used[num] = true;
          if (backtrack(index + 1)) return true;
          // Backtrack if not successful
          result[index] = result[secondIndex] = 0;
          used[num] = false;
        }
      }
    }

    return false; // No valid placement found
  }

  backtrack(0);
  return result;
};
