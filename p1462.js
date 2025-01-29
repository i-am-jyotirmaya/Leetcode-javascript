/**
 * https://leetcode.com/problems/course-schedule-iv
 */

/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var checkIfPrerequisite = function(numCourses, prerequisites, queries) {
    if(!prerequisites.length) {
        return Array(queries.length).fill(false);
    }

    const graph = Array(numCourses);
    const indegree = Array(numCourses).fill(0);
    for(const [a, b] of prerequisites) {
        if(!graph[a]) {
            graph[a] = [];
        }
        graph[a].push(b);
        indegree[b]++;
    }

    const q = [];

    // Push elements with 0 indegree to Queue;
    for(let i = 0; i < numCourses; i++) {
        if(!indegree[i]) {
            q.push(i);
        }
    }

    const nodePrerequisites = new Map();
 
    while(q.length) {
        const node = q.shift();
        for(const adj of graph[node] ?? []) {
            if(!nodePrerequisites.has(adj)) {
                nodePrerequisites.set(adj, new Set());
            }
            nodePrerequisites.get(adj).add(node);

            for(const prereq of nodePrerequisites.get(node) ?? []) {
                nodePrerequisites.get(adj).add(prereq);
            }

            if(--indegree[adj] === 0) {
                q.push(adj);
            }
        }
    }

    const res = []

    for(let i = 0; i < queries.length; i++) {
        const [u, v] = queries[i];
        if(nodePrerequisites.get(v) && nodePrerequisites.get(v).has(u)) {
            res.push(true);
        } else {
            res.push(false);
        }
    }

    return res;
};

const inputs = [
    [2, [[1, 0]], [[0,1],[1,0]]],
    [2, [], [[1,0],[0,1]]],
    [3, [[1,2],[1,0],[2,0]], [[1,0],[1,2]]],
    [4, [[2,3],[2,1],[0,3],[0,1]], [[0,1],[0,3],[2,3],[3,0],[2,0],[0,2]]]
];

for(const [a, b, c] of inputs) {
    console.log(checkIfPrerequisite(a, b, c));
}