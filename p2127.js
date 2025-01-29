/**
 * @param {number[]} favorite
 * @return {number}
 */
var maximumInvitations = function(favorite) {
    const numPeople = favorite.length;
    const visited = Array(numPeople);
    
    // Graph to store people favorites
    const favPeople = new Map();

    for(let i = 0; i < numPeople; i++) {
        if(!favPeople.has(favorite[i])) {
            favPeople.set(favorite[i], [i]);
        } else {
            favPeople.get(favorite[i]).push(i);
        }
    }

    const bfs = (node, visitedNodes) => {
        const q = [[node, 0]];
        let maxDistance = 0;
        while(q.length) {
            const [curr, dist] = q.shift();
            for(const neighbor of favPeople.get(curr) ?? []) {
                if(visitedNodes.has(neighbor)) {
                    continue;
                }
                visitedNodes.add(neighbor);
                q.push([neighbor, dist + 1]);
                maxDistance = Math.max(maxDistance, dist + 1);
            }
        }
        return maxDistance;

    }

    let longestCycle = 0;
    let twoCycleInvitations = 0;


    for(let i = 0; i < numPeople; i++) {
        if(!visited[i]) {
            const visitedPeople = new Map();
            let current = i;
            let distance = 0;

            while(true) {
                if(visited[current]) {
                    break;
                }

                visited[current] = true;

                visitedPeople.set(current, distance++);

                let next = favorite[current];

                if(visitedPeople.has(next)) {
                    let cycleLength = distance - visitedPeople.get(next);
                    longestCycle = Math.max(longestCycle, cycleLength);

                    if(cycleLength === 2) {
                        const visitedNodes = new Set();
                        visitedNodes.add(current);
                        visitedNodes.add(next);
                        twoCycleInvitations += 2 + bfs(current, visitedNodes) + bfs(next, visitedNodes);
                    }
                    break;
                }

                current = next;
            }
        }
    }

    return Math.max(longestCycle, twoCycleInvitations)
};

console.log(maximumInvitations([2,2,1,2]))