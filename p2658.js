/**
 * https://leetcode.com/problems/maximum-number-of-fish-in-a-grid
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var findMaxFish = function(grid) {
    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    const isValid = (r, c) => (r >=0 && r < grid.length && c >= 0 && c < grid[0].length);
    const visited = new Array(grid.length);
    for(let i = 0; i < visited.length; i++) {
        visited[i] = Array(grid[0].length).fill(false);
    }

    let maxFish = 0;

    const dfs = (r, c) => {
        visited[r][c] = true;
        let fishes = grid[r][c];
        for(let d = 0; d < 4; d++) {
            const [dr, dc] = [dirs[d][0] + r, dirs[d][1] + c];
            if(isValid(dr, dc) && !visited[dr][dc] && grid[dr][dc] > 0) {
                fishes += dfs(dr, dc);
            }
        }

        return fishes;
    }

    

    for(let i = 0; i < grid.length; i++) {
        for(let j = 0; j < grid[0].length; j++) {
            if(!visited[i][j] && grid[i][j] > 0) {
                const fishes = dfs(i, j);
                maxFish = Math.max(maxFish, fishes);
            }
        }
    }

    return maxFish;
};

console.log(findMaxFish([[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]));
console.log(findMaxFish([[10,5],[8,0]]));