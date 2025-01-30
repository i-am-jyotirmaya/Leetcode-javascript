/**
 * https://leetcode.com/problems/divide-nodes-into-the-maximum-number-of-groups
 */

/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var magnificentSets = function(n, edges) {
    const adjList = Array(n);
    for(let i = 0; i < n; i++) {
        adjList[i] = [];
    }

    const parent = Array.from({ length: n }, (_, idx) => idx);
    const rank = Array(n).fill(0);

    const union = (a, b) => {
        a = find(a);
        b = find(b);

        if(a === b) return;

        if(rank[a] > rank[b]) {
            parent[b] = a;
        } else if(rank[b] > rank[a]) {
            parent[a] = b;
        } else {
            parent[b] = a;
            rank[a]++;
        }
    }

    const find = (node) => {
        if(parent[node] !== node) {
            parent[node] = find(parent[node]);
        }
        return parent[node];
    }

    const getNumberOfGroups = (node) => {
        const q = [node];
        const layerSeen = Array(n).fill(-1);
        layerSeen[node] = 0;
        let deepestLayer = 0;

        while(q.length) {
            const qLen = q.length;
            for(let i = 0; i < qLen; i++) {
                const curr = q.shift();
                for(const child of adjList[curr]) {
                    if(layerSeen[child] === -1) {
                        layerSeen[child] = deepestLayer + 1;
                        q.push(child);
                    } else {
                        if(layerSeen[child] === deepestLayer) {
                            return -1;
                        }
                    }
                }
            }
            deepestLayer++;
        }
        return deepestLayer;
    }

    for(const [a, b] of edges) {
        adjList[a - 1].push(b - 1);
        adjList[b - 1].push(a - 1);
        union(a - 1, b - 1);
    }

    const numGroupForNode = new Map();

    for(let node = 0; node < n; node++) {
        const numGroup = getNumberOfGroups(node);
        if(numGroup === -1) return -1;

        const rootNode = find(node);
        numGroupForNode.set(rootNode, Math.max(numGroupForNode.get(rootNode) ?? 0, numGroup));
    }

    let total = 0;
    for(const val of numGroupForNode.values()) {
        total += val;
    }

    return total;
};

const inputs = [
    [6, [[1,2],[1,4],[1,5],[2,6],[2,3],[4,6]]],
    [3, [[1,2],[2,3],[3,1]]],
    [26, [[9,16],[8,3],[20,21],[12,16],[14,3],[7,21],[22,3],[22,18],[11,16],[25,4],[2,4],[14,21],[23,3],[17,3],[2,16],[24,16],[13,4],[10,21],[7,4],[9,18],[14,18],[14,4],[14,16],[1,3],[25,18],[17,4],[1,16],[23,4],[2,21],[5,16],[24,18],[20,18],[19,16],[24,21],[9,3],[24,3],[19,18],[25,16],[19,21],[6,3],[26,18],[5,21],[20,16],[2,3],[10,18],[26,16],[8,4],[11,21],[23,16],[13,16],[25,3],[7,18],[19,3],[20,4],[26,3],[23,18],[15,18],[17,18],[10,16],[26,21],[23,21],[7,16],[8,18],[10,4],[24,4],[7,3],[11,18],[9,4],[26,4],[13,21],[22,16],[22,21],[20,3],[6,18],[9,21],[10,3],[22,4],[1,18],[25,21],[11,4],[1,21],[15,3],[1,4],[15,16],[2,18],[13,3],[8,21],[13,18],[11,3],[15,21],[8,16],[17,16],[15,4],[12,3],[6,4],[17,21],[5,18],[6,16],[6,21],[12,4],[19,4],[5,3],[12,21],[5,4]]],
    [92, [[67,29],[13,29],[77,29],[36,29],[82,29],[54,29],[57,29],[53,29],[68,29],[26,29],[21,29],[46,29],[41,29],[45,29],[56,29],[88,29],[2,29],[7,29],[5,29],[16,29],[37,29],[50,29],[79,29],[91,29],[48,29],[87,29],[25,29],[80,29],[71,29],[9,29],[78,29],[33,29],[4,29],[44,29],[72,29],[65,29],[61,29]]]
]


for(const [n, edges] of inputs) {
    console.log(`Input: n = ${n}, edges = ${JSON.stringify(edges)}\n output: ${magnificentSets(n, edges)}\n\n`)
}