import React,{useEffect, useState} from 'react'
// import Navbar from './Navbar';
import Node from './Node';
import './PathfindingVisualizer.css';

const start_node_row=8;
const start_node_col=12;
const finish_node_row=3;
const finish_node_col=26;

const getInitialGrid=()=>{
  const grid=[];
  for(let row=0;row<=15;row++){
    const currRow=[];
    for(let col=0;col<40;col++){
      currRow.push(createNode(col,row));
    }
    grid.push(currRow);
  }
  return grid;
};

const createNode=(col,row)=>{
  return{
    col,
    row,
    isStart: row === start_node_row && col===start_node_col,
    isFinish: row === finish_node_row && col===finish_node_col,
    isWall:false,
    isVisited:false,
    previousNode:null,
    distance:Infinity,
  };
};

const getNewGridWithWallToggled=(grid,row,col)=>{
  const newGrid=grid.slice();
  const node=newGrid[row][col];
  const newNode={
    ...node,
    isWall:!node.isWall,
  };
  newGrid[row][col]=newNode;
  return newGrid;
};

export default function PathfindingVisualizer() {
  const [grid,setGrid]=useState(getInitialGrid());
  const [isMousePressed,setIsMousePressed]=useState(false);

  const visualizeDijkstra=(e)=>{
    e.preventDefault();
  };

  const handleMouseEnter=(row,col)=>{
    console.log('MouseEnter');
    if(!isMousePressed) return;
    const newGrid=getNewGridWithWallToggled(grid,row,col);
    setGrid={newGrid};
  };

  const handleMouseDown=(row,col)=>{
    console.log('Mouse Down');
    const newGrid=getNewGridWithWallToggled(grid,row,col);
    setGrid(newGrid);
    setIsMousePressed(true);
  };

  const handleMouseUp=()=>{
    console.log('Mouse Up');
    setIsMousePressed(false);
  };


  return (
    <>
    {/* <Navbar/> */}
    <button onClick={()=>visualizeDijkstra()} className='btn'>Visualize Dijkstra</button>
    <div className="grid">
      {grid.map((row,rowId)=>{
        return(
          <div key={rowId} className='grid-row'>
            {row.map((node,nodeId)=>{
              const {row,col,isStart,isFinish,isWall}=node;
              return(
                <Node
                key={nodeId}
                col={col}
                row={row}
                isStart={isStart}
                isFinish={isFinish}
                isWall={isWall}
                isMousePressed={isMousePressed}
                onMouseDown={(row,col)=>handleMouseDown(row,col)}
                onMouseEnter={(row,col)=>handleMouseEnter(row,col)}
                onMouseUp={()=>handleMouseUp()}
                >
                </Node>
              );
            })}
          </div>
        )
      })}
    </div>
    </>
  )
}



