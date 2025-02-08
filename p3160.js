/**
 * https://leetcode.com/problems/find-the-number-of-distinct-colors-among-the-balls
 */

/**
 * @param {number} limit
 * @param {number[][]} queries
 * @return {number[]}
 */
var queryResults = function (limit, queries) {
    const ballMap = new Map();
    const colorMap = new Map();
    return queries.map(([ball, color]) => {
        if (ballMap.has(ball)) {
            const prevColor = ballMap.get(ball);
            colorMap.set(prevColor, colorMap.get(prevColor) - 1);
            if (colorMap.get(prevColor) === 0) colorMap.delete(prevColor);
        }
        ballMap.set(ball, color);
        colorMap.set(color, (colorMap.get(color) ?? 0) + 1);
        return colorMap.size;
    });
};