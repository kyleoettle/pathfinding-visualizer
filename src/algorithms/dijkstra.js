// Performs Dijkstra's algorithm; returns *all* nodes in the order
// in which they were visited. Also makes nodes point back to their
// previous node, effectively allowing us to compute the shortest path
// by backtracking from the finish node.
export function dijkstra(grid, startNode, finishNode) {

    const visistedNodesInOrder = [];
    startNode.distance = 0;
    const unvisitedNodes = getAllNodes(grid);
    while (!!unvisitedNodes.length) {
        sortNodesByDistance(unvisitedNodes);
        const closestNode = unvisitedNodes.shift();
        //if we encounter a wall, we skip it.
        if (closestNode.isWall)
            continue;

        //if the closes node is at a distance of infinity,
        //we must be trapped and should therefor stop.
        if (closestNode.distance === Infinity)
            return visistedNodesInOrder;

        closestNode.isVisited = true;
        visistedNodesInOrder.push(closestNode);
        if (closestNode === finishNode)
            return visistedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid);
    }
}

function getAllNodes(grid) {
    const nodes = [];
    for (const row of grid) {
        for (const node of row) {
            nodes.push(node);
        }
    }
    return nodes;
}

function sortNodesByDistance(nodes) {
    nodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
    const unvistedNeighbors = getUnvisitedNeighbors(node, grid);
    for (const neighbor of unvistedNeighbors) {
        neighbor.distance = node.distance + 1;
        neighbor.previousNode = node;
    }
};

function getUnvisitedNeighbors(node, grid) {
    const neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter((neighbor) => { return !neighbor.isVisited });
};

//Backracs from the finishNode to find the shortest path.
//Only works when called after the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInSHortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInSHortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInSHortestPathOrder;
}