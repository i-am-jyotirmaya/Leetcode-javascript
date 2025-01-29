/**
 * @param {character[][]} grid
 * @return {number}
 */
var getFood = function(grid) {
    for(let i = grid.length - 1; i >= 0; i--) {
        for(let j = grid[i].length - 1; j >= 0; j--) {
            const right = (j + 1 === grid[i].length || grid[i][j+1] === "#") ? 0 : (grid[i][j+1] === "X") ? Infinity : grid[i][j+1];
            const bottom = (i + 1 === grid.length || grid[i+1][j] === "#") ? 0 : (grid[i+1][j] === "X") ? Infinity : grid[i+1][j];

            const min = Math.min(right, bottom);

            if(grid[i][j] === "*" && min !== Infinity && min > 0) {
                return min + 1;
            }

            if(grid[i][j] === "#" || grid[i][j] === "X") {
                continue;
            }

            grid[i][j] = min + 1;
        }
    }

    for(let i = grid.length - 1; i >= 0; i--) {
        for(let j = 0; j < grid.length; j++) {
            const left = (j - 1 < 0 || grid[i][j-1] === "#") ? 0 : (grid[i][j-1] === "X") ? Infinity : grid[i][j-1];
            const bottom = (i + 1 === grid.length || grid[i+1][j] === "#") ? 0 : (grid[i+1][j] === "X") ? Infinity : grid[i+1][j];

            const min = Math.min(left, bottom);

            if(grid[i][j] === "*" && min !== Infinity && min > 0) {
                return min + 1;
            }

            if(grid[i][j] === "#" || grid[i][j] === "X") {
                continue;
            }

            grid[i][j] = min + 1;
        }
    }

    return -1;
};

console.log(getFood([["O","*"],["#","O"]]));