/**
 * https://leetcode.com/problems/graph-valid-tree
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree = function(n, edges) {
    if(n === 1) {
        return true;
    }
    if(edges.length !== n - 1) {
        return false;
    }
    const parent = Array(n).fill(0).map((_, idx) => idx);
    const rank = Array(n).fill(1);

    const find = (x) => {
        if(parent[x] !== x) {
            parent[x] = find(parent[x]);
        }
        return parent[x];
    }

    const union = (a, b) => {
        const rootA = find(a);
        const rootB = find(b);

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
            return false;
        }
    }

    for(let i = 1; i < parent.length; i++) {
        if(find(i) !== find(i-1)) {
            return false;
        }
    }

    return true;
};

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
var validTree_dfs = function(n, edges) {
    if(n === 1) {
        return true;
    }
    if(edges.length !== n - 1) {
        return false;
    }
    

    const graph = Array(n);

    for(const [a, b] of edges) {
        if(!graph[a]) {
            graph[a] = [];
        }
        if(!graph[b]) {
            graph[b] = [];
        }
        graph[a].push(b);
        graph[b].push(a);
    }

    const dfs = (node, visited) => {
        const adj = graph[node] ?? [];
        for(const a of adj) {
            if(visited[a]) {
                continue;
            }
            visited[a] = true;
            dfs(a, visited);
        }
    }

    const visited = Array(n).fill(false);
    dfs(0, visited);
    if(visited.some(v => !v)) {
        return false;
    }

    return true;
};

const inputs = [
    [5, [[0,1],[0,2],[0,3],[1,4]]],
    [5, [[0,1],[1,2],[2,3],[1,3],[1,4]]],
    [4, [[0,1],[2,3],[1,2]]]
];

for(const inp of inputs) {
    console.log(`Input: ${JSON.stringify(inp)}\n output: ${validTree_dfs(inp[0], inp[1])}\n\n`)
}