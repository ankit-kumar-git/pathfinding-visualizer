import React from 'react';
import './Node.css';

function Node({col,row,isStart,isFinish,isWall,onMouseEnter,onMouseDown,onMouseUp}) {
  const getClassName=isFinish ? 'node-finish' : isStart ? 'node-start' : isWall ? 'node-wall' : '';
  return (
    <div
    id={`node-${row}-${col}`}
    className={`node ${getClassName}`}
    onMouseDown={() => onMouseDown(row, col)}
    onMouseEnter={()=>onMouseEnter(row,col)}
    onMouseUp={() => onMouseUp()}
    >
    </div>
  );
}

export default Node