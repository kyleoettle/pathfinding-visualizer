import React from 'react';
import Node from '../../components/node/Node';
import { dijkstra, getNodesInShortestPathOrder } from '../../algorithms/dijkstra';
import './PathfindingVisualizer.css'

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;



const PathfindingVisualizer = () => {

    const [grid, setGrid] = React.useState(getInitialGrid());
    const [mouseIsPressed, setMouseIsPressed] = React.useState(false);

    function visualizeDijkstra() {
        const startNode = grid[START_NODE_ROW][START_NODE_COL];
        const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
        animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
    };

    function animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {

        if (visitedNodesInOrder.length > 0) {
            for (let i = 0; i < visitedNodesInOrder.length; i++) {
                setTimeout(() => {
                    const node = visitedNodesInOrder[i];
                    document.getElementById(`node-${node.row}-${node.col}`).className =
                        'node node-visited';
                }, 10 * i);
            }

            setTimeout(() => {
                animateShortestPath(nodesInShortestPathOrder);
            }, 10 * visitedNodesInOrder.length);
        }
    };

    function animateShortestPath(nodesInShortestPathOrder) {

        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
            setTimeout(() => {
                const node = nodesInShortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className =
                    'node node-shortest-path';
            }, 10 * i);
        }

    }

    function handleMouseDown(row, col) {
        const newGrid = getNewGridWithWallToggled(grid, row, col)
        setGrid(newGrid);
        setMouseIsPressed(true);
    };

    function handleMouseEnter(row, col) {
        if (!mouseIsPressed)
            return;
        const newGrid = getNewGridWithWallToggled(grid, row, col)
        setGrid(newGrid);
    };

    function handleMouseUp() {
        setMouseIsPressed(false);
    };

    return (
        <>
            <button onClick={() => visualizeDijkstra()}>
                Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
                {
                    grid.map((row, rowIdx) => {
                        return (
                            <div key={rowIdx}>
                                {
                                    row.map((node, nodeIdx) => {
                                        const { row, col, isFinish, isStart, isWall } = node;
                                        return (
                                            <Node
                                                key={nodeIdx}
                                                row={row}
                                                col={col}
                                                isStart={isStart}
                                                isFinish={isFinish}
                                                isWall={isWall}
                                                onMouseDown={(row, col) => handleMouseDown(row, col)}
                                                onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                                                onMouseUp={() => handleMouseUp()}
                                            ></Node>
                                        );
                                    })
                                }
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

const getInitialGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        const currentRow = [];
        for (let col = 0; col < 50; col++) {
            currentRow.push(createNode(row, col));
        }
        grid.push(currentRow);
    }
    return grid;
};

const createNode = (row, col) => {
    return {
        row,
        col,
        isStart: row === START_NODE_ROW && col === START_NODE_COL,
        isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
    }
};

const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = grid.slice();
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall: !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
};



export default PathfindingVisualizer