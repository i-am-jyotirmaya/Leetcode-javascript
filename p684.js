/**
 * https://leetcode.com/problems/redundant-connection
 */

/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function(edges) {
    const parent = Array(edges.length + 1).fill(0).map((_, idx) => idx);
    const rank = Array(edges.length + 1).fill(1);

    const getParent = (n) => {
        if(parent[n] !== n) {
            parent[n] = getParent(parent[n]);
        }
        return parent[n];
    }

    const union = (a, b) => {
        const rootA = getParent(a);
        const rootB = getParent(b);
        if(rootA === rootB) {
            return false;
        }

        if(rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA;
        } else if(rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else {
            parent[rootB] = rootA;
            rank[rootA]++;
        }

        return true;
    }

    for(const [a, b] of edges) {
        if(!union(a, b)) {
            return [a, b];
        }
    }

    return [];
};

const inputs = [
    [[1,2],[1,3],[2,3]],
    [[1,2],[2,3],[3,4],[1,4],[1,5]],
    [[1,4],[3,4],[1,3],[1,2],[4,5]],
    [[3,4],[1,2],[2,4],[3,5],[2,5]],
    [[3,7],[1,4],[2,8],[1,6],[7,9],[6,10],[1,7],[2,3],[8,9],[5,9]]

];

for(const inp of inputs) {
    console.log(`Input: ${inp}\n output: ${findRedundantConnection(inp)}\n\n`)
}