import React from 'react';
import './Node.css'

const Node = ({ row, col, isStart, isFinish, isWall, onMouseDown, onMouseEnter, onMouseUp }) => {
    const extraClassName =
        isFinish ? 'node-finish'
            : isStart ? 'node-start'
                : isWall ? 'node-wall'
                    : ''
    return (
        <div
            className={`node ${extraClassName}`}
            id={`node-${row}-${col}`}
            onMouseDown={() => onMouseDown(row, col)}
            onMouseEnter={() => onMouseEnter(row, col)}
            onMouseUp={() => onMouseUp()}

        ></div>
    );
};

export default Node