/**
 * https://leetcode.com/problems/letter-tile-possibilities
 */

/**
 * There is an approach where we can solve this using mathematics. But that approach uses factorials which explode upon reaching a certain number which javascript can't handle.
 */

/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function (tiles) {
  let result = new Set();
  let visited = new Array(tiles.length).fill(false);
  let arr = tiles.split("").sort(); // Sort to avoid duplicate permutations

  function backtrack(path) {
    if (path.length > 0) {
      result.add(path.join(""));
    }

    for (let i = 0; i < arr.length; i++) {
      if (visited[i] || (i > 0 && arr[i] === arr[i - 1] && !visited[i - 1])) {
        continue; // Skip duplicate characters
      }

      visited[i] = true;
      path.push(arr[i]);
      backtrack(path);
      path.pop();
      visited[i] = false;
    }
  }

  backtrack([]);
  return result.size;
};
