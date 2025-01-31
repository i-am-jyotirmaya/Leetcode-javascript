/**
 * https://leetcode.com/problems/making-a-large-island
 */

/**
 * @param {number[][]} grid
 * @return {number}
 */
var largestIsland = function(grid) {
    const row = grid.length;
    const col = grid[0].length;

    const isValid = (r, c) => (r >= 0 && r < row && c >= 0 && c < col);

    const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];

    const islandSizes = new Map();
    const colorGrid = Array.from({ length: row }, () => Array(col).fill(-1));
    let currentColor = 1;
    islandSizes.set(currentColor, 0);

    const explore = (r, c) => {
        colorGrid[r][c] = currentColor;
        islandSizes.set(currentColor, islandSizes.get(currentColor) + 1);

        for(const [x, y] of dirs) {
            const [dr, dc] = [r + x, c + y];
            if(isValid(dr, dc) && grid[dr][dc] > 0 && colorGrid[dr][dc] === -1) {
                explore(dr, dc);
            }
        }
    }

    let numWater = 0;


    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if(colorGrid[i][j] === -1 && grid[i][j] > 0) {
                explore(i, j);
                islandSizes.set(++currentColor, 0);
            } else if(grid[i][j] === 0) {
                colorGrid[i][j] = 0;
                numWater++;
            }
        }
    }

    if(!numWater) return row * col;
    if(numWater === row * col) return 1;

    let maxSize = 0;

    for(let i = 0; i < row; i++) {
        for(let j = 0; j < col; j++) {
            if(colorGrid[i][j] === 0) {
                const islandSeen = new Set();
                let size = 0;
                for(const [x, y] of dirs) {
                    const [dr, dc] = [i + x, j + y];
                    if(
                        isValid(dr, dc) && 
                        colorGrid[dr][dc] > 0 && 
                        !islandSeen.has(colorGrid[dr][dc])
                    ) {
                        islandSeen.add(colorGrid[dr][dc]);
                        size += islandSizes.get(colorGrid[dr][dc]);
                    }
                }
                maxSize = Math.max(maxSize, size + 1);
            }
        }
    }

    return maxSize;
};

const inputs = [
    [[1,0],[0,1]],
    [[1,1],[1,0]],
    [[1,1],[1,1]]
]


for(const grid of inputs) {
    console.log(`grid = ${JSON.stringify(grid)}\n output: ${largestIsland(grid)}\n\n`)
}